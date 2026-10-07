import { Link } from "@tanstack/react-router"
import { SUBJECTS } from "../const/subjects"
import type { Vocab } from "../types/subject"
import { Level } from "../types/misc"
import { User } from "../misc/user"

const VocabDisplay = ({ id }: { id: number }) => {
    const vocab = SUBJECTS[id] as Vocab

    const level = User.getSubjectLevel(id)
    const getBgColor = () => {
        if (level === Level.LOCKED) {
            return "var(--color-gray-500)"
        } else if (level < Level.V) {
            return "#745593"
        } else {
            return "var(--color-vocab)"
        }
    }


    return <Link to="/vocab/$id" style={{ backgroundColor: getBgColor() }} params={{ id: "" + id }} className="py-1 px-2 rounded-md flex items-center justify-center border-2 border-black">
        <p className="text-lg text-white">{vocab.writing}</p>
    </Link>
}

export default VocabDisplay