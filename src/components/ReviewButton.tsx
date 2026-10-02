import { Link } from "@tanstack/react-router"
import { User } from "../misc/user"

const ReviewButton = () => {

    const disabled = User.getAvailableReviews().length === 0

    return <Link className="w-full h-40" to="/reviews" disabled={disabled}>
        {/* <p className="text-white">Reviews: {User.getAvailableReviews().length}</p> */}
        <div style={{ backgroundColor: disabled ? "var(--color-gray-400)" : "var(--color-blue-400)"}} className="w-full h-full rounded-3xl p-5 relative">
            <p className="text-white text-4xl font-bold">Review</p>
            {!disabled && <p className="absolute -top-2 -right-2 bg-red-500 p-2 w-10 h-10 rounded-3xl flex items-center justify-center text-lg text-white">{User.getAvailableReviews().length}</p>}
        </div>
    </Link>
}

export default ReviewButton