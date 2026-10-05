import { useNavigate } from "@tanstack/react-router"
import { ReviewResult, SubjectType, TestType } from "../types/misc"
import { useMemo, useState } from "react"
import * as wanakana from 'wanakana';
import { User } from "../misc/user";
import Spinner from "../components/Spinner/Spinner";
import { addAlert } from "../components/Alerts/Alerts";
import { ReviewPageRoute } from "./routes";
import RadicalInfo from "../components/RadicalInfo";
import { SUBJECTS } from "../const/subjects";
import type { Kanji, Radical, Vocab } from "../types/subject";
import KanjiInfo from "../components/KanjiInfo";
import VocabInfo from "../components/VocabInfo";
import { Button, Input } from "react-aria-components";

const ReviewPage = () => {

    const testQueue = useMemo(() => User.mapReviewBatchToTest(), [])
    const lessonQueue = useMemo(() => User.mapReviewBatchToLesson(), [])

    const { type } = ReviewPageRoute.useParams()

    const navigate = useNavigate({ from: "/reviews/$type" })
    const [currentTestIndex, setCurrentTestIndex] = useState(0)
    const [currentAnswer, setCurrentAnswer] = useState("")
    const [halfFinishedVocab, setHalfFinishedVocab] = useState(new Set<number>())
    const queue = type === "test" ? testQueue : lessonQueue

    const nextInQueue = () => {
        if (currentTestIndex === queue.length - 1) {
            navigate({ to: "/" })
        } else {
            setCurrentTestIndex(currentTestIndex + 1)
        }
    }

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
        switch (queue[currentTestIndex].subjectType) {
            case SubjectType.Radical:
            case SubjectType.Kanji:
            case SubjectType.KanaVocab:
                if (queue[currentTestIndex].possibleAnswers.map(a => a.toLocaleLowerCase()).includes(currentAnswer.toLocaleLowerCase())) {
                    reviewResult = ReviewResult.Correct
                }
                break
            case SubjectType.Vocab:
                if (queue[currentTestIndex].possibleAnswers.map(a => a.toLocaleLowerCase()).includes(currentAnswer.toLocaleLowerCase())) {
                    if (halfFinishedVocab.has(queue[currentTestIndex].id)) {
                        reviewResult = ReviewResult.Correct
                    } else {
                        setHalfFinishedVocab(hfV => {
                            hfV.add(queue[currentTestIndex].id)
                            return hfV
                        })
                    }
                }
                break
        }
        // TODO: Add reaction to corrct/wrong answers
        if (reviewResult === ReviewResult.Correct) {
            addAlert({ type: "success", message: "Correct" })
        } else {
            addAlert({ type: "error", message: "Incorrect" })
        }
        User.postReview(queue[currentTestIndex].id, reviewResult)
        nextInQueue()
    }

    const subjectInfo = () => {
        switch (queue[currentTestIndex].subjectType) {
            case SubjectType.Radical:
                return <RadicalInfo radical={SUBJECTS[queue[currentTestIndex].id] as Radical} />
            case SubjectType.Kanji:
                return <KanjiInfo kanji={SUBJECTS[queue[currentTestIndex].id] as Kanji} />
            case SubjectType.Vocab:
            case SubjectType.KanaVocab:
                return <VocabInfo vocab={SUBJECTS[queue[currentTestIndex].id] as Vocab} />
        }
    }

    // TODO: Fix keyboard shifting the page up
    return <div className="h-full flex flex-col items-center justify-start">
        {(queue.length > 0) ? <>
            {queue[currentTestIndex].testType !== TestType.Learning && <>
                <div
                    style={{
                        backgroundColor: bgColor(queue[currentTestIndex].subjectType),
                    }}
                    className="w-full h-1/3 flex items-center justify-center"
                >
                    <p className="text-white text-5xl">{queue[currentTestIndex].question}</p>
                </div>
                <form className="bg-gray-400 w-full h-1/6" onSubmit={e => {
                    e.preventDefault()
                    onSubmit()
                    setCurrentAnswer("")
                }}>
                    <Input
                        type="text"
                        className="w-full h-full text-center text-3xl"
                        value={currentAnswer}
                        onChange={e => onChangeText(e.target.value, queue[currentTestIndex].testType)}
                        onFocus={() => {
                            window.scrollTo(0, 0)
                            document.body.scrollTop = 0
                        }}
                    />
                </form>
            </>}
            {queue[currentTestIndex].testType === TestType.Learning && <div className="py-8">
                {subjectInfo()}
                <div className="flex justify-center items-center mt-5">
                    <Button className="px-5 py-2 rounded-2xl bg-blue-400" onClick={nextInQueue}>Continue</Button>
                </div>
            </div>}
        </> : <Spinner />}
    </div>
}

export default ReviewPage