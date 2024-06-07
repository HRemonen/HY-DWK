import crypto from 'crypto'

const randomUUID = crypto.randomUUID()

const getHashNow = () => {
  const timeStamp = new Date().toISOString()

  console.log(`${timeStamp}: ${randomUUID}`)

  setTimeout(getHashNow, 5000)
}

getHashNow()