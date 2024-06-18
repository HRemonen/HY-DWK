import crypto from 'crypto'

const randomUUID = crypto.randomUUID()

let hash

const generateNewHash = () => {
  const timeStamp = new Date().toISOString()

  return `${timeStamp}: ${randomUUID}`
}

const getHash = () => hash

setInterval(async () => {
  hash = generateNewHash()

  console.log("Generated new hash", getHash())
}, 5000)