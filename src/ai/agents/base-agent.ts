import { EVENTS, addKeyword } from "@builderbot/bot";
import { Callbacks, ModelArgs, ModelName } from "../types";
import { FactoryModel, Memory } from "../brain";
import { TFlow } from "@builderbot/bot/dist/types";
import Runnable from "../brain/rag";
import z, { ZodSchema, ZodType, ZodTypeDef } from "zod"
import Brain from "../brain/rag/brain";

export default class BaseAgent {
	private static kwrd: TFlow<any, any> = addKeyword(EVENTS.ACTION)
	private static schema: ZodSchema
	private static model: FactoryModel

	static setKeyword = (ev: any) => {
		this.kwrd = addKeyword(ev, { sensitive: false })
		return this
	}

	static setZodSchema = <T>(schema: ZodType<T, ZodTypeDef, T>) => {
		this.schema = schema
		return this
	}

	static setAIModel = (ai: { modelName: ModelName, args?: ModelArgs }) => {
		this.model = new FactoryModel(ai)
		return this
	}

	static create = (callbacks?: Callbacks) => {
		const context = Brain.init()

		if (!this.model) {
			this.model = new FactoryModel()
		}

		this.kwrd = callbacks?.beforeStart && callbacks?.beforeStart(this.kwrd) || this.kwrd

		this.kwrd = this.kwrd.addAction(async (ctx, { state }) => {
			try {
				const runnable = new Runnable(this.model.model, await context)

				const schema = this.schema || z.object({
					answer: z.string().describe('Answer as best as possible')
				})

				const aiAnswer = await runnable.retriever({
					question: ctx.body,
					history: await Memory.getMemory(state, 4)
				}, schema)

				Memory.memory({ user: ctx.body, assistant: JSON.stringify(aiAnswer) }, state, this.model.instance)

				await state.update({ aiAnswer })

				console.log(aiAnswer, "===========YAY=========")
			} catch (error) {
				callbacks?.onFailure && callbacks?.onFailure(error)
				await state.update({ aiAnswer: null })
				console.log(error, "===========OOPSIE=========")
			}

		})
		this.kwrd = callbacks?.afterEnd && callbacks?.afterEnd(this.kwrd) || this.kwrd
		return this.kwrd
	}
}
