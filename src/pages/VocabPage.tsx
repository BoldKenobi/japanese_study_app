import { Link } from "@tanstack/react-router"
import { VocabPageRoute } from "./routes"
import { SUBJECTS } from "../const/subjects"
import type { Vocab } from "../types/subject"
import { User } from "../misc/user"
import KanjiDisplay from "../components/KanjiDisplay"

const VocabPage = () => {

    const { id } = VocabPageRoute.useParams()
    const vocab = SUBJECTS[+id] as Vocab
    const level = User.getSubjectLevel(+id)

    return <div className="h-full flex flex-col items-center justify-start gap-8 pt-10">
        <Link className="text-white" to="/">To Home</Link>
        <div className="flex flex-col items-center">
            <div className="p-8 bg-vocab rounded-2xl flex items-center justify-center border-2 border-black relative">
                <p className="text-5xl text-white">{vocab.writing}</p>
                <p className="absolute -top-3 -right-3 bg-gray-400 p-2 w-8 h-8 rounded-2xl flex items-center justify-center text-lg">{level}</p>
            </div>
            <p className="text-4xl text-white mt-5 font-bold text-center">{vocab.meaning[0]}</p>
            <p className="text-xl text-white mt-2">{vocab.meaning.slice(1).join(", ")}</p>
            <p className="mx-8 mt-8 text-white">{vocab.meaningMnemonic.replaceAll(/<.*?>/g, "*")}</p>
            <div className="flex gap-5 w-full mt-5 px-10">
                {vocab.partsOfSpeech.map((pos, i) => <p key={i} className="italic text-gray-400">{pos}</p>)}
            </div>
        </div>
        <hr className="text-white w-9/10" />
        <div className="flex flex-col items-center">
            <p className="text-white text-4xl font-bold">Reading</p>
            <p className="text-xl text-white mt-5">{vocab.reading.join(", ")}</p>
            <p className="mx-8 mt-8 text-white">{vocab.readingMnemonic.replaceAll(/<.*?>/g, "*")}</p>
        </div>
        <hr className="text-white w-9/10" />
        <div className="flex flex-col items-center">
            <p className="text-white text-4xl font-bold">Context</p>
            <div className="mt-5">
                {vocab.contextSentences.map(({ en, ja }, i) => <div key={i}>
                    <p className="mx-8 mt-2 text-white">{ja}</p>
                    <p className="mx-8 mt-2 text-white">{en}</p>
                </div>)}
            </div>
        </div>
        <hr className="text-white w-9/10" />
        <div className="flex flex-col items-center">
            <p className="text-white text-4xl font-bold">Kanji</p>
            <div className="flex justify-evenly flex-wrap gap-5 m-8">
                {vocab.components.map(id => <KanjiDisplay key={id} id={id} />)}
            </div>
        </div>
    </div>
}

export default VocabPage