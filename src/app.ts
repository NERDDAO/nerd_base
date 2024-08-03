import { createBot, MemoryDB, createProvider, addKeyword, createFlow } from '@builderbot/bot'
import { TelegramProvider } from '@builderbot-plugins/telegram'
import "dotenv/config"

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

