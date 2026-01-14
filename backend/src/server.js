import express from 'express'
import { ENV } from './lib/env.js'
import path from 'path'
import { connectDB } from './lib/db.js'

const app = express()
const __dirname = path.resolve()

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Server is running' })
})

app.get('/books', (req, res) => {
  res.status(200).json({ msg: 'Books endpoint' })
})

// Make your app production ready
if (ENV.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')))


  app.use((req, res) => {
    res.sendFile(
      path.join(__dirname, '../frontend/dist', 'index.html')
    )
  })
}

const PORT = ENV.PORT || 5000


const startServer = async () => {
  try {

    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
      })

  } catch (error) {
    console.error("error in starting server",error)
  }
}

startServer();