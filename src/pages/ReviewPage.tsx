import { Link } from "@tanstack/react-router"
import { ReviewResult, SubjectType, TestType } from "../types/misc"
import { useMemo, useState } from "react"
import * as wanakana from 'wanakana';
import { User } from "../misc/user";
import { REVIEW_BATCH_SIZE, SUBJECTS } from "../const/subjects";
import type { Kanji, Radical, Vocab } from "../types/subject";
import Spinner from "../components/Spinner/Spinner";

const ReviewPage = () => {

    const tests = useMemo(() => User.mapReviewBatchToTest(), [])
    const [currentTestIndex, setCurrentTestIndex] = useState(0)
    const [currentAnswer, setCurrentAnswer] = useState("")
    const [halfFinishedVocab, setHalfFinishedVocab] = useState(new Set<number>())

    const bgColor = (type: SubjectType) => {
        switch (type) {
            case SubjectType.Radical:
                return "var(--color-radical)"
            case SubjectType.Kanji:
                return "var(--color-kanji)"
            case SubjectType.Vocab:
            case SubjectType.KanaVocab:
                return "var(--color-vocab)"
        }
    }

    const onChangeText = (text: string, type: TestType) => {
        if (wanakana.isJapanese(text)) {
            setCurrentAnswer(text)
            return
        }
        switch (type) {
            case TestType.Meaning:
                setCurrentAnswer(text)
                break
            case TestType.Reading:
                setCurrentAnswer(wanakana.toHiragana(wanakana.toRomaji(text)))
                break
        }
    }

    const onSubmit = () => {
        let reviewResult = ReviewResult.Wrong
        if (tests[currentTestIndex].testType === TestType.Meaning) {
            switch (tests[currentTestIndex].subjectType) {
                case SubjectType.Radical:
                    if (currentAnswer.toLocaleLowerCase() === (SUBJECTS[tests[currentTestIndex].id] as Radical).meaning) {
                        reviewResult = ReviewResult.Correct
                    }
                    break
                case SubjectType.Kanji:
                    if ((SUBJECTS[tests[currentTestIndex].id] as Kanji).meaning.map(s => s.toLocaleLowerCase()).includes(currentAnswer.toLocaleLowerCase())) {
                        reviewResult = ReviewResult.Correct
                    }
                    break
                case SubjectType.KanaVocab:
                    if ((SUBJECTS[tests[currentTestIndex].id] as Vocab).meaning.map(s => s.toLocaleLowerCase()).includes(currentAnswer.toLocaleLowerCase())) {
                        reviewResult = ReviewResult.Correct
                    }
                    break
                case SubjectType.Vocab:
                    if ((SUBJECTS[tests[currentTestIndex].id] as Vocab).meaning.map(s => s.toLocaleLowerCase()).includes(currentAnswer.toLocaleLowerCase())) {
                        if (halfFinishedVocab.has(tests[currentTestIndex].id)) {
                            reviewResult = ReviewResult.Correct
                        } else {
                            setHalfFinishedVocab(hfV => {
                                hfV.add(tests[currentTestIndex].id)
                                return hfV
                            })
                        }
                    }
                    break
            }
        } else {
            switch (tests[currentTestIndex].subjectType) {
                case SubjectType.Vocab:
                    if ((SUBJECTS[tests[currentTestIndex].id] as Vocab).reading.includes(currentAnswer)) {
                        if (halfFinishedVocab.has(tests[currentTestIndex].id)) {
                            reviewResult = ReviewResult.Correct
                        } else {
                            setHalfFinishedVocab(hfV => {
                                hfV.add(tests[currentTestIndex].id)
                                return hfV
                            })
                        }
                    }
                    break
                case SubjectType.Radical:
                case SubjectType.Kanji:
                case SubjectType.KanaVocab:
            }
        }
        // TODO: Add reaction to corrct/wrong answers
        User.postReview(tests[currentTestIndex].id, reviewResult)
        if (currentTestIndex === REVIEW_BATCH_SIZE - 1) {
            // navigate to '/'
        } else {
            setCurrentTestIndex(currentTestIndex + 1)
        }
    }

    return <div className="h-full flex flex-col items-center justify-start pt-10">
        <Link className="text-white" to="/">To Home</Link>
        {tests.length > 0 ? <>
            <div
                style={{ backgroundColor: bgColor(tests[currentTestIndex].subjectType) }}
                className="mt-8 w-full h-1/4 flex items-center justify-center"
            >
                <p className="text-white text-5xl">{tests[currentTestIndex].question}</p>
            </div>
            <form className="bg-gray-400 w-full h-1/6" onSubmit={e => {
                e.preventDefault()
                onSubmit()
                setCurrentAnswer("")
            }}>
                <input
                    type="text"
                    className="w-full h-full text-center text-3xl"
                    value={currentAnswer}
                    onChange={e => onChangeText(e.target.value, tests[currentTestIndex].testType)}
                />
            </form>
        </> : <Spinner />}
    </div>
}

export default ReviewPage