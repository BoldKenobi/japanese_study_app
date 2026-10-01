import { Link } from "@tanstack/react-router"
import { SUBJECTS } from "../const/subjects"
import type { Radical } from "../types/subject"

const RadicalDisplay = ({ id }: { id: number }) => {
    const radical = SUBJECTS[id] as Radical
    return <Link to="/radical/$id" params={{id: ""+id}} className="w-15 h-15 bg-radical rounded-[3.75px] flex items-center justify-center border-2 border-black">
        <p className="text-xl text-white">{radical.writing}</p>
    </Link>
}

export default RadicalDisplay