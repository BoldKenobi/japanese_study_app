export interface Subject {
    id: number
    level: number
    position: number
    type: "radical" | "kanji" | "kanaVocab" | "vocab"
    writing: string
    components: number[]
    amalgamations: number[]
    meaningMnemonic: string
}

export interface Vocab extends Subject {
    type: "vocab" | "kanaVocab"
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
    type: "kanji"
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
    type: "radical"
    meaning: string
}