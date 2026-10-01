import type { SubjectType } from "./misc"

export interface Subject {
    id: number
    level: number
    position: number
    type: SubjectType
    writing: string
    components: number[]
    amalgamations: number[]
    meaningMnemonic: string
}

export interface Vocab extends Subject {
    type: SubjectType.Vocab | SubjectType.KanaVocab
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
    meaning: string
}