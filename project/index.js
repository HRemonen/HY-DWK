import * as dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import express from 'express'
import request from 'request'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const imgPath = path.join(directory, 'image.jpeg')

const fileAlreadyExists = async () => new Promise(res => {
  fs.stat(imgPath, (err, stats) => {
    if (err || !stats) return res(false)
    return res(true)
  })
})

const downloadImage = async (uri, filename, callback) => {
  request.head(uri, (err, res, body) => {
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  })
}

setInterval(async () => {
  const fileExists = await fileAlreadyExists()

  if (!fileExists) {
    fs.mkdir(directory, { recursive: true }, (err) => {
      if (err) console.error(err)
    })
  }

  downloadImage('https://picsum.photos/1200', imgPath, () => {
    console.log('Image downloaded')
  })
}, 60 * 60000)

app.use(express.static('files'))
app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', (req, res) => {


  res.render('index', { title: 'DWK project', message: 'Hello world!' })
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})