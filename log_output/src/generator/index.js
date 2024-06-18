import crypto from 'crypto'

const randomUUID = crypto.randomUUID()

let hash

const generateNewHash = () => {
  const timeStamp = new Date().toISOString()

  return `${timeStamp}: ${randomUUID}`
}

export const getHash = () => hash

hash = generateNewHash()
setInterval(async () => {
  hash = generateNewHash()

  console.log("Generated new hash", getHash())
}, 5000)