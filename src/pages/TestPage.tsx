import { Button } from "react-aria-components";
import KeyboardInput from "../components/KeyboardInput";
import { TextInputType } from "../types/misc";
import { useState } from "react";

const TestPage = () => {
    const [inputType, setInputType] = useState(TextInputType.ENGLISH)
    const [answer, setAnswer] = useState("")

    return <div className="flex flex-col items-center justify-between h-full">
        
        <div className="flex justify-evenly w-full mt-20">
            <Button className="text-white text-2xl" onClick={() => setInputType(TextInputType.ENGLISH)}>English</Button>
            <Button className="text-white text-2xl" onClick={() => setInputType(TextInputType.HIRAGANA)}>Hiragana</Button>
            <Button className="text-white text-2xl" onClick={() => setInputType(TextInputType.KATAKANA)}>Katakana</Button>
        </div>
        <p className="text-white text-4xl">{answer}</p>
        <KeyboardInput type={inputType} onSubmit={setAnswer} />
    </div>

}

export default TestPage