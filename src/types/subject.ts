import type { SubjectType } from "./misc"

// TODO: Better typing to remove all the 'as Kanji' etc 
export interface Subject {
    id: number
    level: number
    position: number
    type: SubjectType
    components: number[]
    amalgamations: number[]
    meaningMnemonic: string
}

export interface Vocab extends Subject {
    type: SubjectType.Vocab | SubjectType.KanaVocab
    writing: string
    reading: string[]
    meaning: string[]
    etymology?: string
    readingMnemonic: string
    partsOfSpeech: string[]
    contextSentences: {
        en: string
        ja: string
    }[]
}

export interface Kanji extends Subject {
    type: SubjectType.Kanji
    writing: string
    reading: {
        onyomi: string[]
        kunyomi: string[]
        nanori: string[]
    }
    meaning: string[]
    etymology?: string
    readingMnemonic: string
    readingHint: string
    meaningHint: string
    visuallySimilar: number[]
}

export interface Radical extends Subject {
    type: SubjectType.Radical
    writing: string | null
    meaning: string
}