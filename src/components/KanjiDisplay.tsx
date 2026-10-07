import { Link } from "@tanstack/react-router"
import { SUBJECTS } from "../const/subjects"
import type { Kanji } from "../types/subject"
import { Level } from "../types/misc"
import { User } from "../misc/user"

const KanjiDisplay = ({ id }: { id: number }) => {
    const kanji = SUBJECTS[id] as Kanji
    const level = User.getSubjectLevel(id)
    const getBgColor = () => {
        if (level === Level.LOCKED) {
            return "var(--color-gray-500)"
        } else if (level < Level.V) {
            return "#943333"
        } else {
            return "var(--color-kanji)"
        }
    }
    return <Link style={{ backgroundColor: getBgColor() }} to="/kanji/$id" params={{ id: "" + id }} className="w-15 h-15 rounded-[30px] flex items-center justify-center border-2 border-black">
        <p className="text-xl text-white">{kanji.writing}</p>
    </Link>
}

export default KanjiDisplay