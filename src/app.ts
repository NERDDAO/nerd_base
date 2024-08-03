import 'dotenv/config'
import { createBot, MemoryDB, createProvider } from '@builderbot/bot'
import { createShopifyFlow } from './ai/agents/utils'
import { TelegramProvider } from '@builderbot-plugins/telegram'

const configurations = {
	modelName: 'gpt-3.5-turbo-16k',
	temperature: 0,
	openApiKey: 'YOUR_OPENAI_APIKEY',
	shopifyApiKey: 'YOUR_SHOPIFY_APIKEY',
	shopifyDomain: 'YOUR_SHOPIFY_DOMAIN',

}

const shopify_flow = await createShopifyFlow(configurations)


const main = async () => {
	const provider = createProvider(TelegramProvider, {})

	await createBot({
		database: new MemoryDB(),
		provider,
		flow: shopify_flow,
	})
}

main()
