import express from 'express'

const app = express()
const PORT = 3000

let counter = 0

app.get('/', (req, res) => {
  res.send('ping')
})

app.get('/pingpong', (req, res) => {
  const counterValue = counter
  const pingpong = `Ping / Pongs: ${counterValue}`
  counter += 1

  res.status(200).send(pingpong)
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})