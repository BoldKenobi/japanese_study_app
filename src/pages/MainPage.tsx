import { useEffect } from "react"
import { User } from "../misc/user"
import KanjiDisplay from "../components/KanjiDisplay"
import { Link } from "@tanstack/react-router"

const MainPage = () => {

    useEffect(() => {
        User.init()
    }, [])

    return <div className="m-8 flex gap-5 items-center">
        <KanjiDisplay id={440} />
        <Link to="/reviews">
            <p className="text-white">Reviews: {User.getAvailableReviews().length}</p>
        </Link>
    </div>
}

export default MainPage