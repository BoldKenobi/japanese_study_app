/* eslint-disable @typescript-eslint/no-namespace */
export enum SubjectType {
    Radical = "radical",
    Kanji = "kanji",
    Vocab = "vocab",
    KanaVocab = "kanaVocab"
}

export enum TestType {
    Meaning = "meaning",
    Reading = "reading",
    Learning = "learning"
}

export enum ReviewResult {
    Correct = "correct",
    Wrong = "wrong"
}

export enum Level {
    LOCKED = -1,
    O = 0,
    I = 1,
    II = 2,
    III = 3,
    IV = 4,
    V = 5,
    VI = 6,
    VII = 7,
    VIII = 8,
    IX = 9,
    X = 10
}

export namespace Level {
    export const increase = (level: Level) => {
        level += 1
        if (level > Level.X) {
            level = Level.X
        }
        return level
    }

    export const decrease = (level: Level) => {
        level -= 1
        if (level < Level.I) {
            level = Level.I
        }
        return level
    }
}

export enum TextInputType {
    ENGLISH = "english",
    HIRAGANA = "hiragana",
    KATAKANA = "katakana"
}


// export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
// export type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;
// export type XXOR<T, U, V> = XOR<T, XOR<U, V>>