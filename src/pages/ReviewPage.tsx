import { useNavigate } from "@tanstack/react-router"
import { ReviewResult, SubjectType, TestType, TextInputType } from "../types/misc"
import { useMemo, useState } from "react"
import { User } from "../misc/user";
import Spinner from "../components/Spinner/Spinner";
import { addAlert } from "../components/Alerts/Alerts";
import { ReviewPageRoute } from "./routes";
import RadicalInfo from "../components/RadicalInfo";
import { SUBJECTS } from "../const/subjects";
import type { Kanji, Radical, Vocab } from "../types/subject";
import KanjiInfo from "../components/KanjiInfo";
import VocabInfo from "../components/VocabInfo";
import { Button } from "react-aria-components";
import KeyboardInput from "../components/KeyboardInput";
import beggar from "../assets/beggar.svg"
import kick from "../assets/kick.svg"
import ribCage from "../assets/ribCage.svg"
import yurt from "../assets/yurt.svg"
import pope from "../assets/pope.svg"
import tofu from "../assets/tofu.svg"
import creeper from "../assets/creeper.svg"
import explosion from "../assets/explosion.svg"
import deathStar from "../assets/deathStar.svg"
import comb from "../assets/comb.svg"
import hills from "../assets/hills.svg"
import elf from "../assets/elf.svg"
import cactus from "../assets/cactus.svg"
import satellite from "../assets/satellite.svg"
import psychopath from "../assets/psychopath.svg"

const ReviewPage = () => {

    const testQueue = useMemo(() => User.mapReviewBatchToTest(), [])
    const lessonQueue = useMemo(() => User.mapReviewBatchToLesson(), [])

    const { type } = ReviewPageRoute.useParams()

    const navigate = useNavigate({ from: "/reviews/$type" })
    const [currentTestIndex, setCurrentTestIndex] = useState(0)
    const [halfFinishedVocab, setHalfFinishedVocab] = useState(new Set<number>())
    const queue = type === "test" ? testQueue : lessonQueue

    const nextInQueue = () => {
        if (currentTestIndex === queue.length - 1) {
            navigate({ to: "/" })
        } else {
            setCurrentTestIndex(currentTestIndex + 1)
        }
    }

    const getSVGWriting = () => {
        if (queue[currentTestIndex].subjectType === SubjectType.Radical) {
            switch (queue[currentTestIndex].possibleAnswers[0]) {
                case "Beggar":
                    return <img className="h-12 w-12" src={beggar} />
                case "Kick":
                    return <img className="h-12 w-12" src={kick} />
                case "Rib Cage":
                    return <img className="h-12 w-12" src={ribCage} />
                case "Yurt":
                    return <img className="h-12 w-12" src={yurt} />
                case "Pope":
                    return <img className="h-12 w-12" src={pope} />
                case "Tofu":
                    return <img className="h-12 w-12" src={tofu} />
                case "Creeper":
                    return <img className="h-12 w-12" src={creeper} />
                case "Explosion":
                    return <img className="h-12 w-12" src={explosion} />
                case "Death Star":
                    return <img className="h-12 w-12" src={deathStar} />
                case "Comb":
                    return <img className="h-12 w-12" src={comb} />
                case "Hills":
                    return <img className="h-12 w-12" src={hills} />
                case "Elf":
                    return <img className="h-12 w-12" src={elf} />
                case "Cactus":
                    return <img className="h-12 w-12" src={cactus} />
                case "Satellite":
                    return <img className="h-12 w-12" src={satellite} />
                case "Psychopath":
                    return <img className="h-12 w-12" src={psychopath} />
                default:
                    return <p className="text-5xl text-white">{queue[currentTestIndex].question}</p>
            }
        } else {
            return <p className="text-5xl text-white">{queue[currentTestIndex].question}</p>
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

    const onSubmit = (currentAnswer: string) => {
        let reviewResult = ReviewResult.Wrong
        switch (queue[currentTestIndex].subjectType) {
            case SubjectType.Radical:
            case SubjectType.Kanji:
            case SubjectType.KanaVocab:
                if (queue[currentTestIndex].possibleAnswers.map(a => a.toLocaleLowerCase()).includes(currentAnswer.toLocaleLowerCase().trim())) {
                    reviewResult = ReviewResult.Correct
                }
                break
            case SubjectType.Vocab:
                if (queue[currentTestIndex].possibleAnswers.map(a => a.toLocaleLowerCase()).includes(currentAnswer.toLocaleLowerCase().trim())) {
                    if (halfFinishedVocab.has(queue[currentTestIndex].id)) {
                        reviewResult = ReviewResult.Correct
                        setHalfFinishedVocab(hfV => {
                            hfV.delete(queue[currentTestIndex].id)
                            return hfV
                        })
                    } else {
                        reviewResult = ReviewResult.HalfFinished
                        setHalfFinishedVocab(hfV => {
                            hfV.add(queue[currentTestIndex].id)
                            return hfV
                        })
                    }
                }
                break
        }

        switch (reviewResult) {
            case ReviewResult.Correct:
                addAlert({ type: "success", message: "Correct" })
                User.postReview(queue[currentTestIndex].id, reviewResult)
                break
            case ReviewResult.HalfFinished:
                addAlert({ type: "info", message: "Correct" })
                break
            case ReviewResult.Wrong:
                addAlert({ type: "error", message: `Incorrect: ${queue[currentTestIndex].possibleAnswers.join(", ")}` })
                User.postReview(queue[currentTestIndex].id, reviewResult)
                break
        }
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

    return <div className="min-h-full flex flex-col items-center justify-between">
        {(queue.length > 0) ? <>
            {queue[currentTestIndex].testType !== TestType.Learning && <>
                <div
                    style={{
                        backgroundColor: bgColor(queue[currentTestIndex].subjectType),
                    }}
                    className="w-full grow flex items-center justify-center relative"
                >
                    <p className="text-white text-5xl">{getSVGWriting()}</p>
                    <p className="text-white text-2xl font-bold absolute bottom-2">{queue[currentTestIndex].testType.toLocaleUpperCase()}</p>
                </div>
                <KeyboardInput type={queue[currentTestIndex].testType === TestType.Meaning ? TextInputType.ENGLISH : TextInputType.HIRAGANA} onSubmit={onSubmit} clearAfterSubmit />
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