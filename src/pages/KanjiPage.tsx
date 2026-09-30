import { Link } from "@tanstack/react-router"
import { KanjiPageRoute } from "./routes"
import type { Kanji } from "../types/subject"
import { User } from "../misc/user"
import { SUBJECTS } from "../const/subjects"

const KanjiPage = () => {

    const { id } = KanjiPageRoute.useParams()
    const kanji = SUBJECTS[+id] as Kanji
    const level = User.getSubjectLevel(+id)

    return <div className="h-full flex flex-col items-center justify-start gap-8 pt-10">
        <Link className="text-white" to="/">To Home</Link>
        <div className="flex flex-col items-center">
            <div className="w-40 h-40 bg-kanji rounded-[80px] flex items-center justify-center border-2 border-black">
                <p className="text-7xl text-white">{kanji.writing}</p>
            </div>
            <p className="text-4xl text-white mt-5 font-bold">{kanji.meaning[0]}</p>
            <p className="text-xl text-white mt-2">{kanji.meaning.slice(1).join(", ")}</p>
            <p className="mx-8 mt-8 text-white">{kanji.meaningMnemonic.replaceAll(/<.*?>/g, "*")}</p>
        </div>
        <hr className="text-white w-9/10" />
        <div className="flex flex-col items-center">
            <p className="text-white text-4xl font-bold">Reading</p>
            <div className="flex justify-evenly w-full mt-5">
                {kanji.reading.onyomi.length !== 0 && <div>
                    <p className="text-white text-lg font-bold">On'yomi</p>
                    {kanji.reading.onyomi.map(reading => <p className="text-white">{reading}</p>)}
                </div>}
                {kanji.reading.kunyomi.length !== 0 && <div>
                    <p className="text-white text-lg font-bold">Kun'yomi</p>
                    {kanji.reading.kunyomi.map(reading => <p className="text-white">{reading}</p>)}
                </div>}
                {kanji.reading.nanori.length !== 0 && <div>
                    <p className="text-white text-lg font-bold">Nanori</p>
                    {kanji.reading.nanori.map(reading => <p className="text-white">{reading}</p>)}
                </div>}
            </div>
            <p className="mx-8 mt-8 text-white">{kanji.readingMnemonic.replaceAll(/<.*?>/g, "*")}</p>
        </div>
        <hr className="text-white w-9/10" />
        {kanji.etymology && <>
            <div className="flex flex-col items-center">
                <p className="text-white text-4xl font-bold">Etymology</p>
                <p className="mx-8 mt-8 text-white">{kanji.etymology}</p>
            </div>
            <hr className="text-white w-9/10" />
        </>}
        <div className="flex flex-col items-center">
            <p className="text-white text-4xl font-bold">Vocabulary</p>
            <div className="flex justify-evenly flex-wrap gap-5 m-8">{kanji.amalgamations.map(id => <Link className="text-white" to="/vocab/$id" params={{ id: "" + id }}>{SUBJECTS[id].writing}</Link>)}</div>
        </div>
        <p className="text-white">Level: {level}</p>
    </div>
}

export default KanjiPage