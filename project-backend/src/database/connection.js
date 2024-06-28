import { Sequelize } from "sequelize";
import { Umzug, SequelizeStorage } from "umzug";
import Module from "node:module";
import logger from "../utils/logger.js";

const DB_CONNECTION_RETRY_LIMIT = 10;

const require = Module.createRequire(import.meta.url);

export const sequelize = new Sequelize(
  "postgres",
  "postgres",
  process.env.POSTGRES_PASSWORD,
  {
    host: "project-db-svc",
    dialect: "postgres",
  }
);

const umzug = new Umzug({
  migrations: {
    glob: "src/database/migrations/*.cjs",
    resolve: ({ name, path, context }) => {
      const migration = require(path);
      return {
        name,
        up: async () => migration.up(context),
        down: async () => migration.down(context),
      };
    },
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

export const runMigrations = async () => {
  const migrations = await umzug.up();

  logger.info("Migrations up to date", {
    migrations,
  });
};

export const resetDatabase = async () => {
  await sequelize.drop({});
};

const testConnection = async () => {
  await sequelize.authenticate();
  await runMigrations();
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const connectToDatabase = async (attempt = 0) => {
  try {
    await testConnection();
  } catch (err) {
    if (attempt === DB_CONNECTION_RETRY_LIMIT) {
      logger.error(`Connection to database failed after ${attempt} attempts`, {
        error: err.stack,
      });

      return process.exit(1);
    }
    logger.info(
      `Connection to database failed! Attempt ${attempt} of ${DB_CONNECTION_RETRY_LIMIT}`
    );
    logger.error("Database error: ", err);

    await sleep(5000);

    return connectToDatabase(attempt + 1);
  }

  return null;
};
