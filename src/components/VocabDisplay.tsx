import { Link } from "@tanstack/react-router"
import { SUBJECTS } from "../const/subjects"
import type { Vocab } from "../types/subject"

const VocabDisplay = ({ id }: { id: number }) => {
    const vocab = SUBJECTS[id] as Vocab
    return <Link to="/vocab/$id" params={{ id: "" + id }} className="py-1 px-2 bg-vocab rounded-md flex items-center justify-center border-2 border-black">
        <p className="text-lg text-white">{vocab.writing}</p>
    </Link>
}

export default VocabDisplay