import express from 'express'
import { connectToDatabase, sequelize } from './database.js'
import { DataTypes } from 'sequelize'

const app = express()
const PORT = 3000

app.get('/', (req, res) => {
  res.send('ping')
})

app.get('/pingpong', async (req, res) => {
  const Pong = sequelize.define('Pong', {
		count: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
	})

	await sequelize.sync({ alter: true })

	let [pong, created] = await Pong.findOrCreate({ where: {} })

  const pingpong = `Ping / Pongs: ${pong.count}`
  pong.increment({ count: 1 })

  res.status(200).send(pingpong)
})

app.listen(PORT, async () => {
  console.log(`Server started in port ${PORT}`)

  await connectToDatabase()
})