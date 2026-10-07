import { VocabPageRoute } from "./routes"
import { SUBJECTS } from "../const/subjects"
import type { Vocab } from "../types/subject"
import KanjiDisplay from "../components/KanjiDisplay"
import VocabInfo from "../components/VocabInfo"
import { User } from "../misc/user"
import { Button } from "react-aria-components"
import { ReviewResult } from "../types/misc"

const VocabPage = () => {

    const { id } = VocabPageRoute.useParams()
    const vocab = SUBJECTS[+id] as Vocab

    return <div className="h-full flex flex-col items-center justify-start gap-8 pt-10">
        <VocabInfo vocab={vocab} />
        <p className="text-white font-bold">Next Review: {User.getSubjectReview(+id)}</p>
        <hr className="text-white w-9/10" />
        <div className="flex flex-col items-center">
            <p className="text-white text-4xl font-bold">Kanji</p>
            <div className="flex justify-evenly flex-wrap gap-5 m-8">
                {vocab.components.map(id => <KanjiDisplay key={id} id={id} />)}
            </div>
        </div>
        <div className="pb-5">
            <Button className="text-white bg-green-500 rounded-2xl text-2xl p-3" onClick={() => User.postReview(+id, ReviewResult.Correct)}>Increase Level</Button>
        </div>
    </div>
}

export default VocabPage