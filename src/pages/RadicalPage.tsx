import { Link } from "@tanstack/react-router"
import { SUBJECTS } from "../const/subjects"
import { User } from "../misc/user"
import type { Radical } from "../types/subject"
import { RadicalPageRoute } from "./routes"
import KanjiDisplay from "../components/KanjiDisplay"

const RadicalPage = () => {

    const { id } = RadicalPageRoute.useParams()
    const radical = SUBJECTS[+id] as Radical
    const level = User.getSubjectLevel(+id)

    return <div className="h-full flex flex-col items-center justify-start gap-8 pt-10">
        <Link className="text-white" to="/">To Home</Link>
        <div className="flex flex-col items-center">
            <div className="w-40 h-40 bg-radical rounded-[10px] flex items-center justify-center border-2 border-black">
                <p className="text-7xl text-white">{radical.writing}</p>
            </div>
            <p className="text-4xl text-white mt-5 font-bold">{radical.meaning}</p>
            <p className="mx-8 mt-8 text-white">{radical.meaningMnemonic.replaceAll(/<.*?>/g, "*")}</p>
        </div>
        <hr className="text-white w-9/10" />
        <div className="flex flex-col items-center">
            <p className="text-white text-4xl font-bold">Kanji</p>
            <div className="flex justify-evenly flex-wrap gap-5 m-8">
                {radical.amalgamations.map(id => <KanjiDisplay key={id} id={id} />)}
            </div>
        </div>
        <p className="text-white">Level: {level}</p>
    </div>
}

export default RadicalPage