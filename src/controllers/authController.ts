import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { db } from '../db/connection.ts'
import { users } from '../db/schema.ts'
import { generateToken } from '../utils/jwt.ts'
import { comparePassword, hashPassword } from '../utils/passwords.ts'
import { eq } from 'drizzle-orm'

export const register = async (req: Request, res: Response) => {
  try {
    const { email, username, password, firstName, lastName } = req.body
    const hashedPassword = await hashPassword(password)

    const [user] = await db
      .insert(users)
      .values({
        email,
        username,
        firstName,
        lastName,
        password: hashedPassword,
      })
      .returning({
        id: users.id,
        email: users.email,
        username: users.username,
        firstName: users.firstName,
        lastName: users.lastName,
        createdAt: users.createdAt,
      })

    const token = await generateToken({
      id: user.id,
      email: user.email,
      username: user.username,
    })

    return res.status(201).json({
      message: 'user created',
      user,
      token,
    })
  } catch (err) {
    console.log('registration error: ', err)
    res.status(500).json({ error: 'failed to create user' })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const [user] = await db.select().from(users).where(eq(users.email, email))

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const isValidPassword = await comparePassword(password, user.password)

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = await generateToken({
      id: user.id,
      email: user.email,
      username: user.username,
    })

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token,
    })
  } catch (err) {
    console.error('Login error: ', err)
    res.status(500).json({ error: 'Failed to login' })
  }
}
