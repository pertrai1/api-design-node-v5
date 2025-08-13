import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({ message: 'got users' })
})

router.get('/:id', (req, res) => {
  res.json({ message: 'got user' })
})

router.put('/:id', (req, res) => {
  res.json({ message: 'updated user' })
})

router.delete('/:id', (req, res) => {
  res.json({ message: 'deleted user' })
})

export { router }
export default router
