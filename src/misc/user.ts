/* eslint-disable @typescript-eslint/no-namespace */
import { KANJI, MAX_SUBJECT_ID, RADICALS, REVIEW_BATCH_SIZE, SUBJECTS, VOCAB } from "../const/subjects";
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

export namespace User {

    export const getProgress = (): SubjectProgress[] => JSON.parse(localStorage.getItem("review") || "[]")

    const saveProgress = (progress: SubjectProgress[]) => localStorage.setItem("review", JSON.stringify(progress))

    const addReview = (progress: SubjectProgress[], subjectId: number, duration: Duration) => progress[subjectId].nextReview = moment().add(duration).format("YYYY-MM-DD HH:mm")

    export const getSubjectLevel = (id: number) => getProgress()[id].level

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
    const newSubjects = (ids: number[]) => {
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
        if (progress[id].level >= Level.III) {
            // Unlock subjects dependent on leveled up subject at the same level
            newSubjects(SUBJECTS[id].amalgamations
                .filter(amal_id => (progress[amal_id].level === Level.LOCKED) && (SUBJECTS[id].level === SUBJECTS[amal_id].level))
            )
            // Unlock kana vocab when leveled up all kanji of the same level
            if (SUBJECTS[id].type === SubjectType.Kanji) {
                if (KANJI
                    .filter(({ level }) => level === SUBJECTS[id].level)
                    .every(({ id }) => progress[id].level >= Level.III)
                ) {
                    newSubjects(VOCAB
                        .filter(({ id: newSubjectId, level, type }) => (progress[newSubjectId].level === Level.LOCKED)
                            && (level === SUBJECTS[id].level) && (type === SubjectType.KanaVocab))
                        .map(({ id }) => id)
                    )
                }
            }
            // Unlock next levels radicals when all 
            if (SUBJECTS[id].type === SubjectType.Vocab || SUBJECTS[id].type === SubjectType.KanaVocab) {
                if (VOCAB
                    .filter(({ level }) => level === SUBJECTS[id].level)
                    .every(({ id }) => progress[id].level >= Level.III)
                ) {
                    newSubjects(RADICALS
                        .filter(({ id: newSubjectId, level }) => (progress[newSubjectId].level === Level.LOCKED)
                            && (level === SUBJECTS[id].level + 1))
                        .map(({ id }) => id)
                    )
                }
            }

        }
    }

    export const getAvailableReviews = () => getProgress()
        .map((progress, id) => ({ ...progress, id }))
        .filter(({ nextReview }) => nextReview && moment(nextReview).isBefore())

    const getReviewBatch = (size?: number) => size
        ? getAvailableReviews().slice(0, size)
        : getAvailableReviews()

    const reviewDuration = (level: Level, result: ReviewResult): Duration => {
        if (result == ReviewResult.Correct) {
            switch (level) {
                case Level.O:
                    return { hour: 1 }
                case Level.I:
                    return { hour: 3 }
                case Level.II:
                    return { hour: 8 }
                case Level.III:
                    return { day: 1 }
                case Level.IV:
                    return { day: 3 }
                case Level.V:
                    return { day: 8 }
                case Level.VI:
                    return { day: 21 }
                case Level.VII:
                    return { day: 60 }
                case Level.VIII:
                    return { day: 120 }
                case Level.IX:
                    return { day: 180 }
                case Level.X:
                    return { day: 240 }
                case Level.LOCKED:
                    return {} // Should not be possible
            }
        } else {
            switch (level) {
                case Level.O:
                    return { minute: 5 }
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

    export const mapReviewBatchToTest = () => getReviewBatch(REVIEW_BATCH_SIZE).reduce((tests, review) => {
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

}