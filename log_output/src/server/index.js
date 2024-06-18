import fs from 'fs'
import path from 'path'
import express from 'express'
import axios from 'axios'

const app = express()
const PORT = 3000

const directory = path.join('/', 'usr', 'src', 'app', 'logs')
const statusPath = path.join(directory, 'status.txt')

app.get('/', async (req, res) => {
  const hash = fs.readFileSync(statusPath, 'utf8')
  if (!hash) res.status(404).send('No hash found')

  const pingpong = await axios.get('http://pingpong-svc:2345/pingpong')
    .then(response => response.data)
    .catch(err => res.status(500).send(err.message)
  )
  
  res.send(`${hash}. ${pingpong}`)
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})