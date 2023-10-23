import express, { json } from 'express'
import { movieRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

// App init
const app = express()
app.disable('x-powered-by')

// Middlewares
app.use(corsMiddleware())
app.use(json())

// Router
app.use('/movies', movieRouter)

// Puerto
const PORT = process.env.PORT ?? 1234

// Escucha
app.listen(PORT, () => {
  console.log(`Server Listening on http://localhost:${PORT}`)
})
