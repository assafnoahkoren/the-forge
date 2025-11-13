import express from 'express'
import cors from 'cors'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { loadConfig } from '@repo/env-config'
import { appRouter } from './router.js'

// Load and validate configuration
const config = loadConfig()

const app = express()

app.use(cors())

app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
  })
)

app.listen(config.serverPort, () => {
  console.log(`🚀 Server running on http://localhost:${config.serverPort}`)
  console.log(`📝 Environment: ${config.serverNodeEnv}`)
  if (config.databaseUrl) {
    console.log('✅ Database configured')
  }
  if (config.rabbitmqUrl) {
    console.log('✅ RabbitMQ configured')
  }
  if (config.emailHost) {
    console.log('✅ Email configured')
  }
  if (config.smsIsEnabled) {
    console.log('✅ SMS configured')
  }
  if (config.pushIsEnabled) {
    console.log('✅ Push notifications configured')
  }
})
