import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { appRouter } from './router.js'

const app = express()
const port = process.env.PORT || 3001

app.use(cors())

app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
  })
)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
