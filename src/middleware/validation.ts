import type { Request, Response, NextFunction } from 'express'
import { type ZodSchema, ZodError } from 'zod'

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.parse(req.body)
      req.body = validatedData
      next()
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          details: err.issues.map((error) => ({
            field: error.path.join('.'),
            message: error.message,
          })),
        })
      }
      next(err)
    }
  }
}

export const validateParams = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.params)
      next()
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          error: 'Invalid params',
          details: err.issues.map((error) => ({
            field: error.path.join('.'),
            message: error.message,
          })),
        })
      }
      next(err)
    }
  }
}

export const validateQuery = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.query)
      next()
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          error: 'Invalid query',
          details: err.issues.map((error) => ({
            field: error.path.join('.'),
            message: error.message,
          })),
        })
      }
      next(err)
    }
  }
}
