import { User } from "../misc/user"
import type { Radical } from "../types/subject"

const RadicalInfo = ({ radical }: { radical: Radical }) => {

    const level = User.getSubjectLevel(radical.id)

    return <div className="flex flex-col items-center justify-start gap-8">
        <div className="flex flex-col items-center">
            <div className="w-40 h-40 bg-radical rounded-[10px] flex items-center justify-center border-2 border-black relative">
                <p className="text-7xl text-white">{radical.writing}</p>
                <p className="absolute -top-2 -right-2 bg-gray-400 p-2 w-8 h-8 rounded-2xl flex items-center justify-center text-lg">{level}</p>
            </div>
            <p className="text-4xl text-white mt-5 font-bold">{radical.meaning[0]}</p>
            <p className="mx-8 mt-8 text-white">{radical.meaningMnemonic.replaceAll(/<.*?>/g, "*")}</p>
        </div>
    </div>
}

export default RadicalInfo