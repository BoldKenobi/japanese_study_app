import { SUBJECTS } from "../const/subjects"
import type { Radical } from "../types/subject"
import { RadicalPageRoute } from "./routes"
import KanjiDisplay from "../components/KanjiDisplay"
import RadicalInfo from "../components/RadicalInfo"
import { User } from "../misc/user"

const RadicalPage = () => {

    const { id } = RadicalPageRoute.useParams()
    const radical = SUBJECTS[+id] as Radical

    return <div className="h-full flex flex-col items-center justify-start gap-8 pt-10">
        <RadicalInfo radical={radical} />
        <p className="text-white font-bold">Next Review: {User.getSubjectReview(+id)}</p>
        <hr className="text-white w-9/10" />
        <div className="flex flex-col items-center">
            <p className="text-white text-4xl font-bold">Kanji</p>
            <div className="flex justify-evenly flex-wrap gap-5 m-8">
                {radical.amalgamations.map(id => <KanjiDisplay key={id} id={id} />)}
            </div>
        </div>
    </div>
}

export default RadicalPage