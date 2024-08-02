import "dotenv/config"
import {
  createBot,
  createProvider,
  createFlow,
    EVENTS,
} from "@builderbot/bot";
import { join } from 'path'
import { JsonFileDB as Database } from '@builderbot/database-json'
import { TelegramProvider as Provider } from '@builderbot-plugins/telegram'
//import z from "zod"

const PORT = process.env.PORT ?? 3008
import {init} from './ai/agents';
import BaseAgent from "./ai/agents/base-agent";

/**
 * Configuracion de Plugin
 */

const employeesAddon = init();

employeesAddon.employees([
  {
    name: "EMPLEADO_VENDEDOR",
    description:
      "Soy Rob el vendedor amable encargado de atentender si tienes intencion de comprar o interesado en algun producto, mis respuestas son breves.",
    flow: BaseAgent
        .setKeyword(EVENTS.WELCOME)
        .setAIModel({ modelName: 'openai' })//on openai
        .create().addAnswer("YOU DID IT!")
  }
])

/**
 * 
 */


const main = async () => {
 const adapterDB = new Database({ filename: 'db.json' })
    const adapterProvider = createProvider(Provider, {
        token: process.env.TELEGRAM_BOT_TOKEN
    })
  const adapterFlow = createFlow([
        BaseAgent
            .setKeyword(EVENTS.WELCOME).create().addAnswer("YOU DID IT! TWICE!"),
  ]);

const { handleCtx, httpServer } = await createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
})

 httpServer(+PORT)
};

main();
