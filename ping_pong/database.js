import { Sequelize } from 'sequelize'

const DB_CONNECTION_RETRY_LIMIT = 10

export const sequelize = new Sequelize(
  'postgres',
  'postgres',
  process.env.POSTGRES_PASSWORD,
  {
    host: 'postgres-svc',
    dialect: 'postgres',
  }
)

const testConnection = async () => {
  await sequelize.authenticate()
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const connectToDatabase = async (attempt = 0) => {
  try {
    await testConnection()
  } catch (err) {
    if (attempt === DB_CONNECTION_RETRY_LIMIT) {
      console.error(`Connection to database failed after ${attempt} attempts`, {
        error: err.stack,
      })

      return process.exit(1)
    }
    console.log(
      `Connection to database failed! Attempt ${attempt} of ${DB_CONNECTION_RETRY_LIMIT}`
    )
    console.error('Database error: ', err)
    await sleep(5000)

    return connectToDatabase(attempt + 1)
  }

  return null
}