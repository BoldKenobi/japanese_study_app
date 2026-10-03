import type { Kanji, Radical, Subject, Vocab } from "../types/subject"
import subjects from "./subjects.json"

export const MAX_SUBJECT_ID = 9539
export const REVIEW_BATCH_SIZE = 15
export const LESSON_BATCH_SIZE = 5

export const SUBJECTS = subjects as Subject[]
export const KANJI = SUBJECTS.filter((subject) => subject?.type === "kanji") as Kanji[]
export const VOCAB = SUBJECTS.filter((subject) => subject?.type === "vocab" || subject?.type === "kanaVocab") as Vocab[]
export const RADICALS = SUBJECTS.filter((subject) => subject?.type === "radical") as Radical[]