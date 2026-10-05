import { KanjiPageRoute } from "./routes"
import type { Kanji } from "../types/subject"
import { SUBJECTS } from "../const/subjects"
import VocabDisplay from "../components/VocabDisplay"
import RadicalDisplay from "../components/RadicalDisplay"
import KanjiInfo from "../components/KanjiInfo"
import { User } from "../misc/user"

const KanjiPage = () => {

    const { id } = KanjiPageRoute.useParams()
    const kanji = SUBJECTS[+id] as Kanji

    return <div className="h-full flex flex-col items-center justify-start gap-8 pt-10">
        <KanjiInfo kanji={kanji} />
        <p className="text-white font-bold">Next Review: {User.getSubjectReview(+id)}</p>
        <hr className="text-white w-9/10" />
        {kanji.etymology && <>
            <div className="flex flex-col items-center">
                <p className="text-white text-4xl font-bold">Etymology</p>
                <p className="mx-8 mt-8 text-white">{kanji.etymology}</p>
            </div>
            <hr className="text-white w-9/10" />
        </>}
        <div className="flex flex-col items-center">
            <p className="text-white text-4xl font-bold">Radicals</p>
            <div className="flex justify-evenly flex-wrap gap-5 m-8">
                {kanji.components.map(id => <RadicalDisplay key={id} id={id} />)}
            </div>
        </div>
        <hr className="text-white w-9/10" />
        <div className="flex flex-col items-center">
            <p className="text-white text-4xl font-bold">Vocabulary</p>
            <div className="flex justify-evenly flex-wrap gap-5 m-8">
                {kanji.amalgamations.map(id => <VocabDisplay key={id} id={id} />)}
            </div>
        </div>
    </div>
}

export default KanjiPage