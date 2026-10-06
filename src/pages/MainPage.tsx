import { useEffect } from "react"
import { User } from "../misc/user"
// import KanjiDisplay from "../components/KanjiDisplay"
import ReviewButton from "../components/ReviewButton"
import { Link } from "@tanstack/react-router"
import LessonButton from "../components/LessonButton"
// import { VOCAB } from "../const/subjects"
const MainPage = () => {

    useEffect(() => {
        User.init()
        // User.newSubjects(VOCAB.filter(({ level }) =>  level === 1).map(({ id }) => id))
    }, [])

    return <div className="m-8 flex flex-col gap-5 items-center">
        <LessonButton />
        <ReviewButton />
        <p className="text-white font-bold">Next Review: {User.getNextReview()}</p>
        <hr className="text-white w-9/10" />
        <Link to="/test">Test</Link>
        <p className="text-white text-4xl font-bold">Levels:</p>
        <div className="flex flex-wrap gap-5 justify-evenly mt-5">
            {new Array(60).fill(0).map((_, i) => <Link key={i} className="text-white text-xl bg-zinc-600 h-12 w-12 rounded-4xl flex justify-center items-center" to="/level/$level" params={{ level: "" + (i + 1) }}>
                {i + 1}
            </Link>)}
        </div>
    </div>
}

export default MainPage