import { Router } from 'express'
import {
  validateBody,
  validateParams,
  validateQuery,
} from '../middleware/validation.ts'
import { z } from 'zod'

const createHabitSchema = z.object({
  name: z.string(),
})
const completeParamsSchema = z.object({
  id: z.string(),
})
const router = Router()

router.get('/', (req, res) => {
  res.json({ message: 'habits' })
})

router.get('/:id', (req, res) => {
  res.json({ message: 'one habit' })
})

router.post('/', validateBody(createHabitSchema), (req, res) => {
  res.json({ message: 'created habit' })
})

router.delete('/:id', (req, res) => {
  res.json({ message: 'deleted habit' })
})

router.post(
  '/:id/complete',
  validateParams(completeParamsSchema),
  validateQuery(createHabitSchema),
  (req, res) => {
    res.json({ message: 'completed habit' })
  }
)

export { router }
export default router
