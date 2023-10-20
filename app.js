const crypto = require('node:crypto')
const express = require('express')

const movies = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./schemas/movieSchema.js')

const app = express()
app.disable('x-powered-by')

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:1234'
]

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'hola mundo' })
})

// GET all movies
app.get('/movies', (req, res) => {
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin)
  }

  const { genre } = req.query

  if (genre) {
    const moviesByGenre = movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()))
    return res.json(moviesByGenre)
  }

  res.json(movies)
})

// GET movie by id
app.get('/movies/:id', (req, res) => {
  const { id } = req.params

  const movieById = movies.find(movie => movie.id === id)

  if (movieById) res.json(movieById)
  res.status(404).json({ error: 'Not found' })
})

// POST new movie
app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }

  movies.push(newMovie)

  res.status(201).json(newMovie)
})

// Update movie
app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)

  if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })

  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) return res.status(404).json({ error: 'Not found' })

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updateMovie

  res.json(updateMovie)
})

app.options('/movies/:id', (req, res) => {
  const origin = req.header('origin')

  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  }

  res.sendStatus(200)
})

app.delete('/movies/:id', (req, res) => {
  const origin = req.header('origin')

  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  }

  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    res.status(404).json({ message: 'Not found' })
  }

  movies.splice(movieIndex, 1)

  res.json({ message: 'Movie deleted' })
})

app.use((req, res) => {
  res.json({ error: 404 })
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server Listening on http://localhost:${PORT}`)
})
