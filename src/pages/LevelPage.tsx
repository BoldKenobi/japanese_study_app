import KanjiDisplay from "../components/KanjiDisplay"
import RadicalDisplay from "../components/RadicalDisplay"
import VocabDisplay from "../components/VocabDisplay"
import { KANJI, RADICALS, VOCAB } from "../const/subjects"
import { LevelPageRoute } from "./routes"

const LevelPage = () => {

    const { level } = LevelPageRoute.useParams()
    const radicals = RADICALS.filter(({ level: subjectLevel }) => subjectLevel === +level)
    const kanji = KANJI.filter(({ level: subjectLevel }) => subjectLevel === +level)
    const vocab = VOCAB.filter(({ level: subjectLevel }) => subjectLevel === +level)

    return <div className="h-full flex flex-col items-center justify-start gap-8 pt-10">
        <div className="flex flex-col items-center">
            <p className="text-white text-4xl font-bold">Radicals</p>
            <div className="flex flex-wrap justify-evenly gap-5 mt-5 mx-5">
                {radicals.map(({ id }) => <RadicalDisplay key={id} id={id} />)}
            </div>
        </div>
        <hr className="text-white w-9/10" />
        <div className="flex flex-col items-center">
            <p className="text-white text-4xl font-bold">Kanji</p>
            <div className="flex flex-wrap justify-evenly gap-5 mt-5 mx-5">
                {kanji.map(({ id }) => <KanjiDisplay key={id} id={id} />)}
            </div>
        </div>
        <hr className="text-white w-9/10" />
        <div className="flex flex-col items-center">
            <p className="text-white text-4xl font-bold">Vocab</p>
            <div className="flex flex-wrap justify-evenly gap-5 mt-5 mx-5">
                {vocab.map(({ id }) => <VocabDisplay key={id} id={id} />)}
            </div>
        </div>
    </div>
}

export default LevelPage