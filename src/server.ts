import express from 'express'
import { router as authRoutes } from './routes/authRoutes.ts'
import { router as userRoutes } from './routes/userRoutes.ts'
import { router as habitRoutes } from './routes/habitRoutes.ts'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import { isTest } from '../env.ts'

const server = express()
server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(
  morgan('dev', {
    skip: () => isTest(),
  })
)

server.get('/health', (req, res) => {
  res.json({ message: 'hello' }).status(200)
})

server.use('/api/auth', authRoutes)
server.use('/api/users', userRoutes)
server.use('/api/habits', habitRoutes)

export { server }

export default server
