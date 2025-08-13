import express from 'express'

const server = express()

server.get('/health', (req, res) => {
  res.json({ message: 'hello' }).status(200)
})

export { server }

export default server
