import { useEffect } from "react"
import { User } from "../misc/user"
// import KanjiDisplay from "../components/KanjiDisplay"
import ReviewButton from "../components/ReviewButton"
import { Link } from "@tanstack/react-router"

const MainPage = () => {

    useEffect(() => {
        User.init()
    }, [])

    return <div className="m-8 flex flex-col gap-5 items-center">
        {/* <KanjiDisplay id={440} /> */}
        <ReviewButton />
        <hr className="text-white w-9/10" />
        <p className="text-white text-4xl font-bold">Levels:</p>
        <div className="flex flex-wrap gap-5 justify-evenly mt-5">
            {new Array(60).fill(0).map((_, i) => <Link className="text-white text-xl bg-zinc-600 h-12 w-12 rounded-4xl flex justify-center items-center" to="/level/$level" params={{ level: "" + (i + 1) }}>
                {i + 1}
            </Link>)}
        </div>
    </div>
}

export default MainPage