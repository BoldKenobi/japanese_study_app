import { Link } from "@tanstack/react-router"
import { useEffect } from "react"
import { User } from "../misc/user"

const MainPage = () => {

    useEffect(() => {
        // User.resetUser()
        User.init()
    }, [])

    return <div className="h-full">
        <Link to="/kanji/$id" params={{ id: "440" }}>To Kanji 一</Link>
        <p>Reviews: {User.getAvailableReviews().length}</p>
    </div>
}

export default MainPage