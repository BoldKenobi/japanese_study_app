import { User } from "../misc/user"
import type { Radical } from "../types/subject"
import beggar from "../assets/beggar.svg"
import kick from "../assets/kick.svg"
import ribCage from "../assets/ribCage.svg"
import yurt from "../assets/yurt.svg"
import pope from "../assets/pope.svg"
import tofu from "../assets/tofu.svg"
import creeper from "../assets/creeper.svg"
import explosion from "../assets/explosion.svg"
import deathStar from "../assets/deathStar.svg"
import comb from "../assets/comb.svg"
import hills from "../assets/hills.svg"
import elf from "../assets/elf.svg"
import cactus from "../assets/cactus.svg"
import satellite from "../assets/satellite.svg"
import psychopath from "../assets/psychopath.svg"

const RadicalInfo = ({ radical }: { radical: Radical }) => {

    const level = User.getSubjectLevel(radical.id)

    const getSVGWriting = () => {
        switch (radical.meaning[0]) {
            case "Beggar":
                return <img className="h-20 w-20" src={beggar} />
            case "Kick":
                return <img className="h-20 w-20" src={kick} />
            case "Rib Cage":
                return <img className="h-20 w-20" src={ribCage} />
            case "Yurt":
                return <img className="h-20 w-20" src={yurt} />
            case "Pope":
                return <img className="h-20 w-20" src={pope} />
            case "Tofu":
                return <img className="h-20 w-20" src={tofu} />
            case "Creeper":
                return <img className="h-20 w-20" src={creeper} />
            case "Explosion":
                return <img className="h-20 w-20" src={explosion} />
            case "Death Star":
                return <img className="h-20 w-20" src={deathStar} />
            case "Comb":
                return <img className="h-20 w-20" src={comb} />
            case "Hills":
                return <img className="h-20 w-20" src={hills} />
            case "Elf":
                return <img className="h-20 w-20" src={elf} />
            case "Cactus":
                return <img className="h-20 w-20" src={cactus} />
            case "Satellite":
                return <img className="h-20 w-20" src={satellite} />
            case "Psychopath":
                return <img className="h-20 w-20" src={psychopath} />
            default:
                return <p className="text-7xl text-white">{radical.writing}</p>
        }
    }

    // TODO: 19 Radicals have no character, render image instead (also on RadicalDisplay)
    return <div className="flex flex-col items-center justify-start gap-8">
        <div className="flex flex-col items-center">
            <div className="w-40 h-40 bg-radical rounded-[10px] flex items-center justify-center border-2 border-black relative">
                {getSVGWriting()}
                <p className="absolute -top-2 -right-2 bg-gray-400 p-2 w-8 h-8 rounded-2xl flex items-center justify-center text-lg">{level}</p>
            </div>
            <p className="text-4xl text-white mt-5 font-bold">{radical.meaning[0]}</p>
            <p className="mx-8 mt-8 text-white">{radical.meaningMnemonic.replaceAll(/<.*?>/g, "*")}</p>
        </div>
    </div>
}

export default RadicalInfo