import { connect, JSONCodec } from "nats";
import TelegramBot from "node-telegram-bot-api";
import logger from "./utils/logger.js";

const POD_NAME = process.env.POD_NAME || "unknown";
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = "-4561805519";

// Handle TG bot connection
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });

// Handle nats connection
const nc = await connect({
  servers: "nats://my-nats.default.svc.cluster.local:4222",
});
const jc = JSONCodec();

// Subscribe to the "todos" subject
const subject = "todos";
const sub = nc.subscribe(subject, { queue: "broadcaster.workers" });
logger.info(`${POD_NAME} standing by to receive messages on ${subject}`);

for await (const m of sub) {
  const msg = jc.decode(m.data);
  logger.info(`${POD_NAME} - received message: ${JSON.stringify(msg)}`);

  const titleMsg =
    msg?.reason === "created"
      ? `A new todo has been created`
      : `A todo has been updated`;
  const formattedMsg = `<pre>${JSON.stringify(msg, null, 2)}</pre>`;
  const broadcasterMsg = `Broadcasted from <b>${POD_NAME}</b>`;
  const finalMessage = `${titleMsg}\n\n${formattedMsg}\n\n${broadcasterMsg}`;

  bot.sendMessage(TELEGRAM_CHAT_ID, finalMessage, { parse_mode: "HTML" });
}

await nc.close();
