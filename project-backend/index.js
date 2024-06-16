import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 8000

const TODOS = [
  { id: 1, title: 'Todo 1' },
  { id: 2, title: 'Todo 2' },
  { id: 3, title: 'Todo 3' },
]

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Ping backend')
})

app.get('/todos', (req, res) => {
  res.json({ status: 'success', data: TODOS })
})

app.post('/todos', (req, res) => {
  const { title } = req.body
  
  if (!title) {
    return res.status(400).json({ status: 'error', message: 'Title is required' })
  }

  TODOS.push({ id: TODOS.length + 1, title })

  res.status(201).json({ status: 'success', message: 'Todo created' })
})

app.listen(PORT, () => {
  console.log(`Project backend listening on port ${PORT}`)
})