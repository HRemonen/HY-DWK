import crypto from 'crypto'
import express from 'express'

const app = express()
const PORT = 8080

const randomUUID = crypto.randomUUID()

const getHashNow = () => {
  const timeStamp = new Date().toISOString()

  return `${timeStamp}: ${randomUUID}`
}

app.get('/', (req, res) => {
  const hash = getHashNow()

  res.send(hash)
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})