import fs from 'fs'
import crypto from 'crypto'

const randomUUID = crypto.randomUUID()

const getHashNow = () => {
  const timeStamp = new Date().toISOString()

  return `${timeStamp}: ${randomUUID}`
}

setInterval(() => {
  const hash = getHashNow()

  fs.writeFile('logs/status.txt', hash, (err) => {
    if (err) console.error(err)
    console.log(hash)
  }
  )
}, 5000)