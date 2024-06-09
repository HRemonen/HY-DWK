import fs from 'fs'
import path from 'path'
import express from 'express'

const app = express()
const PORT = 3000

const directory = path.join('/', 'usr', 'src', 'app', 'logs')
const statusPath = path.join(directory, 'status.txt')
const pingpongPath = path.join(directory, 'pingpong.txt')

app.get('/', (req, res) => {
  try {
    const hash = fs.readFileSync(statusPath, 'utf8')
    if (!hash) res.status(404).send('No hash found')

    const pingpong = fs.readFileSync(pingpongPath, 'utf8')
    if (!pingpong) res.status(404).send('No pingpong found')
    
    res.send(`${hash}. ${pingpong}`)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})