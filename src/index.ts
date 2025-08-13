import { server } from './server.ts'
import { env } from '../env.ts'

server.listen(env.PORT, () => {
  console.log(`server is running on port ${env.PORT}`)
})
