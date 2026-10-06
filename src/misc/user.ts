/* eslint-disable @typescript-eslint/no-namespace */
import { KANJI, LESSON_BATCH_SIZE, MAX_SUBJECT_ID, RADICALS, REVIEW_BATCH_SIZE, SUBJECTS, VOCAB } from "../const/subjects";
import moment from "moment";
import { Level, ReviewResult, SubjectType, TestType } from "../types/misc";

type Duration = {
    day?: number
    hour?: number
    minute?: number
}

export type SubjectProgress = {
    nextReview: string | null
    level: Level
    id: number
}

export type Test = {
    id: number,
    subjectType: SubjectType
    testType: TestType,
    question: string | null
    possibleAnswers: string[]
}

export type Lesson = Test

export namespace User {

    export const getProgress = (): SubjectProgress[] => JSON.parse(localStorage.getItem("review") || "[]")

    const saveProgress = (progress: SubjectProgress[]) => localStorage.setItem("review", JSON.stringify(progress))

    const addReview = (progress: SubjectProgress[], subjectId: number, duration: Duration) => progress[subjectId].nextReview = moment().add(duration).format("YYYY-MM-DD HH:mm")

    export const getSubjectLevel = (id: number) => getProgress()[id].level

    export const getSubjectReview = (id: number) => {
        const review = getProgress()[id].nextReview
        if (review) {
            return moment(review).format("MMMM Do YYYY HH:mm")
        } else {
            return "Locked"
        }
    }

    export const getNextReview = () => {

        let nextReview = getProgress()
            .filter(({ nextReview }) => !!nextReview)
            .reduce((next, { nextReview: review }) => moment(review).isBefore(next) ? moment(review) : next, moment().endOf("year"))

        if (nextReview.isBefore(moment())) {
            nextReview = moment()
        }
        return nextReview.format("MMMM Do YYYY HH:mm")
    }

    export const init = () => {
        if (getProgress().every(({ level }) => level === Level.LOCKED)) {
            const progress: SubjectProgress[] = new Array(MAX_SUBJECT_ID)
                .fill(0)
                .map((_, id) => ({ id, nextReview: null, level: Level.LOCKED }))
            saveProgress(progress)
            newSubjects(RADICALS.filter(({ level }) => level === 1).map(({ id }) => id))
        }
    }

    // TODO: Make sure reviews are grouped at specific times
    // TODO: Make sure reviews don't bunch up too much
    export const newSubjects = (ids: number[]) => {
        const progress = getProgress()
        ids.forEach(id => {
            progress[id].level = Level.O
            addReview(progress, id, { minute: 0 })
        })
        saveProgress(progress)
    }

    export const postReview = (id: number, result: ReviewResult) => {
        const progress = getProgress()
        addReview(progress, id, reviewDuration(progress[id].level, result))
        if (result === ReviewResult.Correct) {
            progress[id].level = Level.increase(progress[id].level)
        } else {
            progress[id].level = Level.decrease(progress[id].level)
        }
        saveProgress(progress)
        if (progress[id].level >= Level.V) {
            // Unlock subjects dependent on leveled up subject at the same level
            newSubjects(SUBJECTS[id].amalgamations
                .filter(amal_id => (progress[amal_id].level === Level.LOCKED) && (SUBJECTS[id].level === SUBJECTS[amal_id].level))
            )
            // Unlock remaining Kanji when all Radicals are level V
            if (SUBJECTS[id].type === SubjectType.Radical) {
                if (RADICALS
                    .filter(({ level }) => level === SUBJECTS[id].level)
                    .every(({ id }) => progress[id].level >= Level.V)
                ) {
                    newSubjects(KANJI
                        .filter(({ level, id: unlockId }) => level === SUBJECTS[id].level
                            && progress[unlockId].level === Level.LOCKED)
                        .map(({ id }) => id)
                    )
                }
            }
            // Unlock kana vocab when leveled up all kanji of the same level
            if (SUBJECTS[id].type === SubjectType.Kanji) {
                if (KANJI
                    .filter(({ level }) => level === SUBJECTS[id].level)
                    .every(({ id }) => progress[id].level >= Level.V)
                ) {
                    newSubjects(VOCAB
                        .filter(({ id: unlockId, level }) => (level === SUBJECTS[id].level)
                            && (progress[unlockId].level === Level.LOCKED))
                        .map(({ id }) => id)
                    )
                }
            }
            // Unlock next levels radicals when all vocabs are level V
            if (SUBJECTS[id].type === SubjectType.Vocab || SUBJECTS[id].type === SubjectType.KanaVocab) {
                if (VOCAB
                    .filter(({ level }) => level === SUBJECTS[id].level)
                    .every(({ id }) => progress[id].level >= Level.V)
                ) {
                    newSubjects(RADICALS
                        .filter(({ id: unlockId, level }) => (level === SUBJECTS[id].level + 1)
                            && (progress[unlockId].level === Level.LOCKED))
                        .map(({ id }) => id)
                    )
                }
            }

        }
    }

    export const getAvailableReviews = () => getProgress()
        .filter(({ level }) => level !== 0)
        .filter(({ nextReview }) => nextReview && moment(nextReview).isBefore())

    export const getAvailableLessons = () => getProgress()
        .filter(({ level }) => level === 0)
        .filter(({ nextReview }) => nextReview && moment(nextReview).isBefore())

    const getReviewBatch = () => getAvailableReviews().slice(0, REVIEW_BATCH_SIZE)

    const getLessonBatch = () => getAvailableLessons().slice(0, LESSON_BATCH_SIZE)

    const reviewDuration = (level: Level, result: ReviewResult): Duration => {
        if (result == ReviewResult.Correct) {
            switch (level) {
                case Level.O:
                    return { hour: 1 }
                case Level.I:
                    return { hour: 3 }
                case Level.II:
                    return { hour: 5 }
                case Level.III:
                    return { hour: 8 }
                case Level.IV:
                    return { hour: 12 }
                case Level.V:
                    return { day: 1 }
                case Level.VI:
                    return { day: 3 }
                case Level.VII:
                    return { day: 5 }
                case Level.VIII:
                    return { day: 8 }
                case Level.IX:
                    return { day: 12 }
                case Level.X:
                    return { day: 21 }
                case Level.XI:
                    return { day: 30 }
                case Level.XII:
                    return { day: 60 }
                case Level.XIII:
                    return { day: 90 }
                case Level.XIV:
                    return { day: 120 }
                case Level.XV:
                    return { day: 150 }
                case Level.XVI:
                    return { day: 180 }
                case Level.XVII:
                    return { day: 210 }
                case Level.XVIII:
                    return { day: 240 }
                case Level.XIX:
                    return { day: 270 }
                case Level.XX:
                    return { day: 365 }
                case Level.LOCKED:
                    return {} // Should not be possible
            }
        } else {
            switch (level) {
                case Level.O:
                    return { hour: 1 }
                case Level.I:
                    return { hour: 1 }
                case Level.II:
                    return { hour: 1 }
                case Level.III:
                    return { hour: 5 }
                case Level.IV:
                    return { hour: 5 }
                case Level.V:
                    return { hour: 5 }
                case Level.VI:
                    return { day: 1 }
                case Level.VII:
                    return { day: 1 }
                case Level.VIII:
                    return { day: 3 }
                case Level.IX:
                    return { day: 3 }
                case Level.X:
                    return { day: 3 }
                case Level.XI:
                    return { day: 3 }
                case Level.XII:
                    return { day: 3 }
                case Level.XIII:
                    return { day: 3 }
                case Level.XIV:
                    return { day: 3 }
                case Level.XV:
                    return { day: 3 }
                case Level.XVI:
                    return { day: 3 }
                case Level.XVII:
                    return { day: 3 }
                case Level.XVIII:
                    return { day: 3 }
                case Level.XIX:
                    return { day: 3 }
                case Level.XX:
                    return { day: 3 }
                case Level.LOCKED:
                    return {} // Should not be possible
            }
        }
    }

    export const resetUser = () => {
        const progress: SubjectProgress[] = new Array(MAX_SUBJECT_ID)
            .fill(0)
            .map((_, id) => ({ id, nextReview: null, level: Level.LOCKED }))
        saveProgress(progress)
    }

    export const mapReviewBatchToTest = () => getReviewBatch().reduce((tests, review) => {
        const subject = SUBJECTS[review.id]
        switch (subject.type) {
            case SubjectType.Radical:
                return [...tests, {
                    id: review.id,
                    subjectType: SubjectType.Radical,
                    testType: TestType.Meaning,
                    question: subject.writing,
                    possibleAnswers: subject.meaning
                }]
            case SubjectType.Kanji:
                return [...tests, {
                    id: review.id,
                    subjectType: SubjectType.Kanji,
                    testType: TestType.Meaning,
                    question: subject.writing,
                    possibleAnswers: subject.meaning
                }]
            case SubjectType.Vocab:
                return [...tests, {
                    id: review.id,
                    subjectType: SubjectType.Vocab,
                    testType: TestType.Meaning,
                    question: subject.writing,
                    possibleAnswers: subject.meaning
                }, {
                    id: review.id,
                    subjectType: SubjectType.Vocab,
                    testType: TestType.Reading,
                    question: subject.writing,
                    possibleAnswers: subject.reading
                }]
            case SubjectType.KanaVocab:
                return [...tests, {
                    id: review.id,
                    subjectType: SubjectType.KanaVocab,
                    testType: TestType.Meaning,
                    question: subject.writing,
                    possibleAnswers: subject.meaning
                }]
        }
    }, [] as Test[]).sort(() => 0.5 - Math.random())

    export const mapReviewBatchToLesson = () => getLessonBatch().reduce((lessons, review) => {
        const subject = SUBJECTS[review.id]
        switch (subject.type) {
            case SubjectType.Radical:
                return [...lessons, {
                    id: review.id,
                    subjectType: SubjectType.Radical,
                    testType: TestType.Learning,
                    question: "",
                    possibleAnswers: []
                }, {
                    id: review.id,
                    subjectType: SubjectType.Radical,
                    testType: TestType.Meaning,
                    question: subject.writing,
                    possibleAnswers: subject.meaning
                }]
            case SubjectType.Kanji:
                return [...lessons, {
                    id: review.id,
                    subjectType: SubjectType.Kanji,
                    testType: TestType.Learning,
                    question: "",
                    possibleAnswers: []
                }, {
                    id: review.id,
                    subjectType: SubjectType.Kanji,
                    testType: TestType.Meaning,
                    question: subject.writing,
                    possibleAnswers: subject.meaning
                }]
            case SubjectType.Vocab:
                return [...lessons, {
                    id: review.id,
                    subjectType: SubjectType.Vocab,
                    testType: TestType.Learning,
                    question: "",
                    possibleAnswers: []
                }, {
                    id: review.id,
                    subjectType: SubjectType.Vocab,
                    testType: TestType.Meaning,
                    question: subject.writing,
                    possibleAnswers: subject.meaning
                }, {
                    id: review.id,
                    subjectType: SubjectType.Vocab,
                    testType: TestType.Reading,
                    question: subject.writing,
                    possibleAnswers: subject.reading
                }]
            case SubjectType.KanaVocab:
                return [...lessons, {
                    id: review.id,
                    subjectType: SubjectType.KanaVocab,
                    testType: TestType.Learning,
                    question: "",
                    possibleAnswers: []
                }, {
                    id: review.id,
                    subjectType: SubjectType.KanaVocab,
                    testType: TestType.Meaning,
                    question: subject.writing,
                    possibleAnswers: subject.meaning
                }]
        }
    }, [] as Lesson[])
}