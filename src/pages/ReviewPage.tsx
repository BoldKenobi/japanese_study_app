import { Link, useNavigate } from "@tanstack/react-router"
import { ReviewResult, SubjectType, TestType } from "../types/misc"
import { useMemo, useState } from "react"
import * as wanakana from 'wanakana';
import { User } from "../misc/user";
import Spinner from "../components/Spinner/Spinner";

const ReviewPage = () => {

    const tests = useMemo(() => User.mapReviewBatchToTest(), [])
    const navigate = useNavigate({ from: "/reviews" })
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
        switch (tests[currentTestIndex].subjectType) {
            case SubjectType.Radical:
            case SubjectType.Kanji:
            case SubjectType.KanaVocab:
                if (tests[currentTestIndex].possibleAnswers.map(a => a.toLocaleLowerCase()).includes(currentAnswer.toLocaleLowerCase())) {
                    reviewResult = ReviewResult.Correct
                }
                break
            case SubjectType.Vocab:
                if (tests[currentTestIndex].possibleAnswers.map(a => a.toLocaleLowerCase()).includes(currentAnswer.toLocaleLowerCase())) {
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
        // TODO: Add reaction to corrct/wrong answers
        User.postReview(tests[currentTestIndex].id, reviewResult)
        console.log(reviewResult)
        if (currentTestIndex === tests.length - 1) {
            navigate({ to: "/" })
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