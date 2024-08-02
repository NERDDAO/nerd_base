import { EVENTS } from "@builderbot/bot"
import { TFlow } from "@builderbot/bot/dist/types"

export type Eventskrd = keyof typeof EVENTS

export type Callbacks = {
    beforeStart?: <P, B>(flow: TFlow<P, B>) => TFlow<P, B>,
    afterEnd?: <P, B>(flow: TFlow<P, B>) => TFlow<P, B>,
    onFailure?: (error: Error) => void
}

export type ModelArgs = {
    modelName: string,
    maxOutputTokens?: number,
    apikey?: string,
    temperature?: number,
    topK?: number
    topP?: number
    configuration?: { baseURL: string }
}

export type Employee = {
  name: string;
  description: string;
  flow?: TFlow<any, any>
}

export type ModelName = 'openai'

export type InvokeParams = {
    question: string,
    history: any,
    format_instructions?: string
}

export type ContextOpts = {
    similarityThreshold: number
    k: number,
    path: string
}
