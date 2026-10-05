import { useMemo, useState } from "react";
import { Button } from "react-aria-components";
import * as wanakana from 'wanakana';

const TestPage = () => {

    const sentence = "私の名前はフェリクスです。"
    const translation = "My name is Felix."

    // eslint-disable-next-line react-hooks/purity
    const tokens = useMemo(() => wanakana.tokenize(sentence, { detailed: true, compact: false }).sort(() => 0.5 - Math.random()), [])
    const [answer, setAnswer] = useState<(string | null)[]>(new Array(tokens.length).fill(null))

    return <div className="flex flex-col items-center">

        <div className="h-20 flex items-center justify-center">
            <p className="text-white text-2xl">{translation}</p>
        </div>
        <hr className="text-white w-9/10" />

        <div className="flex gap-5 flex-wrap m-8">
            {answer.map((token, i) => {
                if (token) {
                    return <p className="bg-green-600 rounded-lg text-white px-4 py-2" key={i}>{token}</p>
                } else {
                    return <div className="w-14 h-8 bg-zinc-700 rounded-lg" key={i}></div>
                }
            })}
        </div>
        <hr className="text-white w-9/10" />
        <div className="flex gap-5 flex-wrap m-8">
            {tokens.map((token, i) => <Button onClick={() => setAnswer(answer => {
                answer[answer.findIndex(v => !v)] = (token as { type: string, value: string }).value
                console.log(answer)
                return answer
            })} className="bg-green-600 rounded-lg text-white px-4 py-2" key={i}>{(token as { type: string, value: string }).value}</Button>)}
        </div>
    </div>

}

export default TestPage