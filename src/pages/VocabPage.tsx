import { Link } from "@tanstack/react-router"
import { VocabPageRoute } from "./routes"

const VocabPage = () => {

    const { id } = VocabPageRoute.useParams()

    return <div>
        <Link to="/">Home</Link>
        <p>ID: {id}</p>
    </div>
}

export default VocabPage