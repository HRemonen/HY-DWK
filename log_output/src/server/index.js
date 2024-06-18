import fs from 'fs'
import express from 'express'
import { getHash } from '../generator/index.js'

const app = express()
const PORT = 3000

app.get('/', (req, res) => {
  try {
    const hash = getHash()

    const pingpong = 'pong'
    
    res.send(`${hash}: ${pingpong}`)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})