import { useEffect } from "react"
import { User } from "../misc/user"
import KanjiDisplay from "../components/KanjiDisplay"
import { Link } from "@tanstack/react-router"
import { Level } from "../types/misc"
import { SUBJECTS } from "../const/subjects"

const MainPage = () => {

    useEffect(() => {
        User.init()
        console.log(User.getAvailableReviews())
        console.log(User.getProgress().filter(({ level }) => level !== Level.LOCKED).map(({id, level}) => `${SUBJECTS[id].writing} ${level}`))
    }, [])

    return <div className="m-8 flex gap-5 items-center">
        <KanjiDisplay id={440} />
        <Link to="/reviews">
            <p className="text-white">Reviews: {User.getAvailableReviews().length}</p>
        </Link>
    </div>
}

export default MainPage