import express from 'express'
import { router as authRoutes } from './routes/authRoutes.ts'
import { router as userRoutes } from './routes/userRoutes.ts'
import { router as habitRoutes } from './routes/habitRoutes.ts'

const server = express()

server.get('/health', (req, res) => {
  res.json({ message: 'hello' }).status(200)
})

server.use('/api/auth', authRoutes)
server.use('/api/users', userRoutes)
server.use('/api/habits', habitRoutes)

export { server }

export default server
