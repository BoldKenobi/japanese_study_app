import { useState } from "react"
// import { button } from "react-aria-components"
import { BsShift, BsShiftFill } from "react-icons/bs"
import { IoIosArrowRoundForward } from "react-icons/io"
import { IoBackspaceOutline } from "react-icons/io5"
import * as wanakana from 'wanakana';
import { TextInputType } from "../types/misc"

const KeyboardInput = ({ type, onSubmit, clearAfterSubmit = false }: { type: TextInputType, onSubmit: (value: string) => void, clearAfterSubmit?: boolean }) => {

    const [value, setValue] = useState("")
    const [shift, setShift] = useState(false)
    const [special, setSpecial] = useState(false)

    const onNewChar = (char: string) => {
        if (wanakana.isJapanese(char)) {
            setValue(v => v + char)
            return
        }
        switch (type) {
            case TextInputType.ENGLISH:
                setValue(v => v + char)
                break
            case TextInputType.HIRAGANA:
                // setValue(v => wanakana.toHiragana(wanakana.toRomaji(v + char)))
                setValue(v => wanakana.toHiragana(v + char, { IMEMode: "toHiragana" }))
                break
            case TextInputType.KATAKANA:
                setValue(v => wanakana.toKatakana(v + char, { IMEMode: "toKatakana" }))
                break
        }
        setShift(false)
    }

    return <div className="w-full flex flex-col">
        <div className="bg-gray-400 w-full h-20 flex items-center justify-center text-3xl text-white">{value}</div>
        <div className="h-72 w-full bg-zinc-600 flex flex-col items-center gap-3 pt-3">
            <div className="flex w-full items-center gap-1 justify-center">
                {(special ? "1234567890" : "qwertyuiop").split("").map(c => <button key={c} onClick={() => onNewChar(shift ? c.toLocaleUpperCase() : c)} className="bg-zinc-400 w-9 h-14 rounded-md text-white active:bg-zinc-500 text-2xl">{shift ? c.toLocaleUpperCase() : c}</button>)}
            </div>
            <div className="flex w-full items-center gap-1 justify-center">
                {(special ? "-/:@()「」￥＆" : "asdfghjkl").split("").map(c => <button key={c} onClick={() => onNewChar(shift ? c.toLocaleUpperCase() : c)} className="bg-zinc-400 w-9 h-14 rounded-md text-white active:bg-zinc-500 text-2xl">{shift ? c.toLocaleUpperCase() : c}</button>)}
            </div>
            <div className="flex w-full items-center gap-1 justify-center">
                <button className="bg-zinc-400 w-14 h-14 rounded-md text-white flex items-center justify-center active:bg-zinc-500" onClick={() => setShift(s => !s)}>{shift ? <BsShiftFill size={20} /> : <BsShift size={20} />}</button>
                {(special ? "・。、？！'," : "zxcvbnm").split("").map(c => <button key={c} onClick={() => onNewChar(shift ? c.toLocaleUpperCase() : c)} className="bg-zinc-400 w-9 h-14 rounded-md text-white active:bg-zinc-500 text-2xl">{shift ? c.toLocaleUpperCase() : c}</button>)}
                <button className="bg-zinc-400 w-14 h-14 rounded-md text-white flex items-center justify-center active:bg-zinc-500" onClick={() => setValue(v => v.slice(0, -1))}><IoBackspaceOutline size={25} /></button>
            </div>
            <div className="flex w-full items-center gap-1 justify-end">
                <button className="bg-zinc-400 w-14 h-14 rounded-md text-white active:bg-zinc-500" onClick={() => setSpecial(s => !s)}>#+=</button>
                <button className="bg-zinc-400 w-9 h-14 rounded-md text-white active:bg-zinc-500" onClick={() => setValue(v => v + "ー")}>ー</button>
                <button className="bg-zinc-400 w-44 h-14 rounded-md active:bg-zinc-500" onClick={() => setValue(v => v + " ")}></button>
                <button className="bg-zinc-400 w-9 h-14 rounded-md text-white active:bg-zinc-500" onClick={() => setValue(v => v + ".")}>.</button>
                <button className="bg-blue-400 w-18 h-14 rounded-md text-white flex items-center justify-center active:bg-blue-300" onClick={() => {
                    onSubmit(value)
                    if (clearAfterSubmit) {
                        setValue("")
                    }
                }}><IoIosArrowRoundForward size={30} /></button>
            </div>
        </div>
    </div>
}

export default KeyboardInput