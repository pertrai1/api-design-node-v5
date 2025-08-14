import {
  createTestHabit,
  createTestUser,
  cleanupDatabase,
} from './helpers/dbHelpers.ts'

describe('Authentication Endpoints', () => {
  afterEach(async () => {
    await cleanupDatabase()
  })
  test('should connect to the test db', async () => {
    const { user, token } = await createTestUser()

    expect(user).toBeDefined()
  })
})
