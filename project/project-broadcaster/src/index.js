import { connect, JSONCodec } from "nats";

import logger from "./utils/logger.js";

const podName = process.env.POD_NAME || "unknown";

const nc = await connect({
  servers: "nats://my-nats.default.svc.cluster.local:4222",
});
const jc = JSONCodec();

const subject = "todos";

const sub = nc.subscribe(subject, { queue: "broadcaster.workers" });
logger.info(`${podName} standing by to receive messages on ${subject}`);

for await (const m of sub) {
  const msg = jc.decode(m.data);
  logger.info(`${podName} - received message: ${JSON.stringify(msg)}`);
}

await nc.close();
