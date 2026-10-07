import { Link } from "@tanstack/react-router"
import { SUBJECTS } from "../const/subjects"
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
import { Level } from "../types/misc"
import { User } from "../misc/user"

const RadicalDisplay = ({ id }: { id: number }) => {
    const radical = SUBJECTS[id] as Radical

    const level = User.getSubjectLevel(id)
    const getBgColor = () => {
        if (level === Level.LOCKED) {
            return "var(--color-gray-500)"
        } else if (level < Level.V) {
            return "#96bddf"
        } else {
            return "var(--color-radical)"
        }
    }

    const getSVGWriting = () => {
        switch (radical.meaning[0]) {
            case "Beggar":
                return <img className="h-6 w-6" src={beggar} />
            case "Kick":
                return <img className="h-6 w-6" src={kick} />
            case "Rib Cage":
                return <img className="h-6 w-6" src={ribCage} />
            case "Yurt":
                return <img className="h-6 w-6" src={yurt} />
            case "Pope":
                return <img className="h-6 w-6" src={pope} />
            case "Tofu":
                return <img className="h-6 w-6" src={tofu} />
            case "Creeper":
                return <img className="h-6 w-6" src={creeper} />
            case "Explosion":
                return <img className="h-6 w-6" src={explosion} />
            case "Death Star":
                return <img className="h-6 w-6" src={deathStar} />
            case "Comb":
                return <img className="h-6 w-6" src={comb} />
            case "Hills":
                return <img className="h-6 w-6" src={hills} />
            case "Elf":
                return <img className="h-6 w-6" src={elf} />
            case "Cactus":
                return <img className="h-6 w-6" src={cactus} />
            case "Satellite":
                return <img className="h-6 w-6" src={satellite} />
            case "Psychopath":
                return <img className="h-6 w-6" src={psychopath} />
            default:
                return <p className="text-xl text-white">{radical.writing}</p>
        }
    }

    // TODO: Delete Radicals: Worm @ 17, Corn @ 23, Egg @ 26, Trident @ 41, 
    return <Link to="/radical/$id" style={{backgroundColor: getBgColor()}} params={{ id: "" + id }} className="w-15 h-15 rounded-[3.75px] flex items-center justify-center border-2 border-black">
        {getSVGWriting()}
    </Link>
}

export default RadicalDisplay