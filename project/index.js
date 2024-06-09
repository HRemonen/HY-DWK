import * as dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index', { title: 'DWK project', message: 'Hello world!' })
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})