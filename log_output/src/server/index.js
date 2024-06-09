import fs from 'fs'
import express from 'express'

const app = express()
const PORT = 3000

app.get('/', (req, res) => {
  try {
    const hash = fs.readFileSync('logs/status.txt', 'utf8')
    if (!hash) res.status(404).send('No hash found')
    
    res.send(hash)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})