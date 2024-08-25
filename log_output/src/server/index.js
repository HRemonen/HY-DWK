import fs from 'fs'
import path from 'path'
import express from 'express'
import axios from 'axios'

const app = express()
const PORT = 3000

const logsDir = path.join('/', 'usr', 'src', 'app', 'logs')
const configDir = path.join('/', 'usr', 'src', 'app', 'config')

const statusPath = path.join(logsDir, 'status.txt')
const informationPath = path.join(configDir, 'information.txt')

app.get('/', async (req, res) => {
  const information = fs.readFileSync(informationPath, 'utf8')
  if (!information) res.status(404).send('No config information found')
  res.write(`file content: ${information}` + '\n')

  if (process.env.MESSAGE) res.write(`MESSAGE: ${process.env.MESSAGE}` + '\n') 

  const hash = fs.readFileSync(statusPath, 'utf8')
  if (!hash) res.status(404).send('No hash found')

  res.write(hash + '\n')

  const pingpong = await axios.get('http://pingpong-svc:80/pingpong') .then(response => response.data)
    .catch(err => res.status(500).send(err.message)
  )
  
  res.write(pingpong)
  res.end()
})


app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})