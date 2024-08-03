import { createBot, MemoryDB, EVENTS, createProvider, addKeyword, createFlow } from '@builderbot/bot'
import { EmployeesClass } from './ai/agents/'
import { TelegramProvider } from '@builderbot-plugins/telegram'
import "dotenv/config"



const expertFlow = addKeyword(EVENTS.ACTION)
	.addAction(async (_, { state, flowDynamic }) => {
		const currentState = state.getMyState()
		return flowDynamic(currentState.answer) /** here come the answer by OpenAi pluggin */
	})

const welcomeFlow = addKeyword(['hi'])
	.addAnswer('Ey! welcome')
	.addAnswer('Your name is?', { capture: true }, async (ctx, { flowDynamic }) => {
		await flowDynamic([`nice! ${ctx.body}`, 'I will send you a funny image'])
	})
	.addAction(async (_, { flowDynamic }) => {
		const dataApi = await fetch(`https://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true`)
		const [imageUrl] = await dataApi.json()
		await flowDynamic([{ body: '😜', media: imageUrl }])
	})
const ledger = new EmployeesClass()

ledger.employees([
	{
		name: "EXPERT_AGENT",
		description:
			"Hello, my name is Leifer. I am the specialized person in charge of resolving your doubts about our chatbot course, which is developed with Node.js and JavaScript. This course is designed to facilitate sales automation in your business. I will provide concise and direct answers to maximize your understanding.",
		flow: expertFlow,
	}
])

const main = async () => {
	const adapterDB = new MemoryDB()
	const adapterFlow = createFlow([welcomeFlow])
	const adapterProvider = createProvider(TelegramProvider, {
		token: process.env.TELEGRAM_BOT_TOKEN
	})



	const bot = await createBot({
		flow: adapterFlow,
		provider: adapterProvider,
		database: adapterDB,
	})
	bot.httpServer(3008)
}

main()

