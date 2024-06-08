import * as dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('ping')
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})