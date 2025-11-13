import { z } from 'zod'

// Helper for parsing numbers from environment variables
const numericString = z
  .string()
  .regex(/^\d+$/, 'Must be a numeric string')
  .transform(Number)

// Complete environment schema
export const envSchema = z.object({
  // Server
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: numericString.default('3001'),

  // Database
  DATABASE_URL: z.string().url('Must be a valid PostgreSQL URL').optional(),

  // RabbitMQ
  RABBITMQ_URL: z.string().url('Must be a valid AMQP URL').optional(),

  // Email
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: numericString.optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),

  // SMS (Twilio)
  TWILIO_ACCOUNT_SID: z.string().optional(),
  TWILIO_AUTH_TOKEN: z.string().optional(),
  TWILIO_PHONE_NUMBER: z.string().optional(),

  // Push Notifications (FCM)
  FCM_SERVER_KEY: z.string().optional(),

  // Push Notifications (APNS)
  APNS_KEY_ID: z.string().optional(),
  APNS_TEAM_ID: z.string().optional(),
})

export type Env = z.infer<typeof envSchema>
