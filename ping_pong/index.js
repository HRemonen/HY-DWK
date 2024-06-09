import fs from 'fs'
import path from 'path'
import express from 'express'

const app = express()
const PORT = 3000

const directory = path.join('/', 'usr', 'src', 'app', 'logs')
const filePath = path.join(directory, 'pingpong.txt')

let counter = 0

app.get('/', (req, res) => {
  res.send('ping')
})

app.get('/pingpong', (req, res) => {
  const counterValue = counter
  const pingpong = `Ping / Pongs: ${counterValue}`

  fs.writeFile(filePath, pingpong, (err) => {
    if (err) res.status(500).send(err.message)
  })

  counter += 1

  res.send(`pong ${counterValue}`)
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})