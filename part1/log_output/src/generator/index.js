import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const randomUUID = crypto.randomUUID()

const directory = path.join('/', 'usr', 'src', 'app', 'logs')
const filePath = path.join(directory, 'status.txt')

const fileAlreadyExists = async () => new Promise(res => {
  fs.stat(filePath, (err, stats) => {
    if (err || !stats) return res(false)
    return res(true)
  })
})

const getHashNow = () => {
  const timeStamp = new Date().toISOString()

  return `${timeStamp}: ${randomUUID}`
}

setInterval(async () => {
  const fileExists = await fileAlreadyExists()
  const hash = getHashNow()

  if (!fileExists) {
    fs.mkdir(directory, { recursive: true }, (err) => {
      if (err) console.error(err)
    })
  }

  fs.writeFile(filePath, hash, (err) => {
    if (err) console.error(err)
    console.log(hash)
  }
  )
}, 5000)