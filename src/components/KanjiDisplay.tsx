import { Link } from "@tanstack/react-router"
import { SUBJECTS } from "../const/subjects"
import type { Kanji } from "../types/subject"

const KanjiDisplay = ({ id }: { id: number }) => {
    const kanji = SUBJECTS[id] as Kanji
    return <Link to="/kanji/$id" params={{ id: "" + id }} className="w-15 h-15 bg-kanji rounded-[30px] flex items-center justify-center border-2 border-black">
        <p className="text-xl text-white">{kanji.writing}</p>
    </Link>
}

export default KanjiDisplay