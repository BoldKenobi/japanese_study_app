import { useEffect } from "react"
import { User } from "../misc/user"
import KanjiDisplay from "../components/KanjiDisplay"

const MainPage = () => {

    useEffect(() => {
        User.init()
    }, [])

    return <div className="m-8 flex gap-5 items-center">
        <KanjiDisplay id={440} />
        <p className="text-white">Reviews: {User.getAvailableReviews().length}</p>
    </div>
}

export default MainPage