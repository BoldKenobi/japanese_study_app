import { User } from "../misc/user"
import type { Kanji } from "../types/subject"

const KanjiInfo = ({ kanji }: { kanji: Kanji }) => {

    const level = User.getSubjectLevel(kanji.id)

    return <div className="flex flex-col items-center justify-start gap-8">
        <div className="flex flex-col items-center">
            <div className="w-40 h-40 bg-kanji rounded-[80px] flex items-center justify-center border-2 border-black relative">
                <p className="text-7xl text-white">{kanji.writing}</p>
                <p className="absolute top-1 right-1 bg-gray-400 p-2 w-8 h-8 rounded-2xl flex items-center justify-center text-lg">{level}</p>
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
                    {kanji.reading.onyomi.map((reading, i) => <p key={i} className="text-white">{reading}</p>)}
                </div>}
                {kanji.reading.kunyomi.length !== 0 && <div>
                    <p className="text-white text-lg font-bold">Kun'yomi</p>
                    {kanji.reading.kunyomi.map((reading, i) => <p key={i} className="text-white">{reading}</p>)}
                </div>}
                {kanji.reading.nanori.length !== 0 && <div>
                    <p className="text-white text-lg font-bold">Nanori</p>
                    {kanji.reading.nanori.map((reading, i) => <p key={i} className="text-white">{reading}</p>)}
                </div>}
            </div>
            <p className="mx-8 mt-8 text-white">{kanji.readingMnemonic.replaceAll(/<.*?>/g, "*")}</p>
        </div>
    </div>
}

export default KanjiInfo