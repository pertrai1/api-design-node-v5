import { Router } from 'express'
import {
  validateBody,
  validateParams,
  validateQuery,
} from '../middleware/validation.ts'
import { z } from 'zod'
import { authenticateToken } from '../middleware/auth.ts'
import {
  createHabit,
  deleteHabit,
  getHabitById,
  getUserHabits,
  updateHabit,
} from '../controllers/habitController.ts'

const createHabitSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  frequency: z.string(),
  targetCount: z.string(),
  tagIds: z.array(z.string()).optional(),
})

const updateHabitSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().optional(),
  frequency: z.enum(['daily', 'weekly', 'monthly']).optional(),
  targetCount: z.number().int().positive().optional(),
  isActive: z.boolean().optional(),
  tagIds: z.array(z.string().uuid()).optional(),
})

const completeParamsSchema = z.object({
  id: z.string(),
})

const uuidSchema = z.object({
  id: z.uuid('Invalid habit ID format'),
})
const router = Router()

router.use(authenticateToken)

router.get('/', getUserHabits)

router.get('/:id', getHabitById)

router.post('/', validateBody(createHabitSchema), createHabit)

router.put(
  '/:id',
  validateParams(uuidSchema),
  validateBody(updateHabitSchema),
  updateHabit
)

router.delete('/:id', validateParams(uuidSchema), deleteHabit)

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
