import express from 'express'

const app = express()
const PORT = 3000

let counter = 0

app.get('/pingpong', (req, res) => {
  const counterValue = counter
  
  counter += 1
  res.send(`pong ${counterValue}`)
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})