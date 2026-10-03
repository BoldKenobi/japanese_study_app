import type { SubjectType } from "./misc"

export type SubjectBase = {
    id: number
    level: number
    position: number
    components: number[]
    amalgamations: number[]
    meaningMnemonic: string
    meaning: string[]
}

export type Vocab = {
    type: SubjectType.Vocab | SubjectType.KanaVocab
    writing: string
    reading: string[]
    etymology?: string
    readingMnemonic: string
    partsOfSpeech: string[]
    contextSentences: {
        en: string
        ja: string
    }[]
} & SubjectBase

export type Kanji = {
    type: SubjectType.Kanji
    writing: string
    reading: {
        onyomi: string[]
        kunyomi: string[]
        nanori: string[]
    }
    etymology?: string
    readingMnemonic: string
    readingHint: string
    meaningHint: string
    visuallySimilar: number[]
} & SubjectBase

export type Radical = {
    type: SubjectType.Radical
    writing: string | null
} & SubjectBase

export type Subject = Radical | Kanji | Vocab