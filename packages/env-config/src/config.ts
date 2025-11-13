import type { Env } from './env.schema.js'

export interface AppConfig {
  // Server
  serverPort: number
  serverNodeEnv: 'development' | 'production' | 'test'
  serverIsDevelopment: boolean
  serverIsProduction: boolean
  serverIsTest: boolean

  // Database
  databaseUrl?: string

  // RabbitMQ
  rabbitmqUrl?: string

  // Email
  emailHost?: string
  emailPort?: number
  emailUser?: string
  emailPass?: string

  // SMS (Twilio)
  smsAccountSid?: string
  smsAuthToken?: string
  smsPhoneNumber?: string
  smsIsEnabled: boolean

  // Push Notifications (FCM)
  pushFcmServerKey?: string

  // Push Notifications (APNS)
  pushApnsKeyId?: string
  pushApnsTeamId?: string

  // Push Notifications
  pushIsEnabled: boolean
}

export function createConfig(env: Env): AppConfig {
  const nodeEnv = env.NODE_ENV

  const smsIsEnabled = !!(
    env.TWILIO_ACCOUNT_SID &&
    env.TWILIO_AUTH_TOKEN &&
    env.TWILIO_PHONE_NUMBER
  )

  const pushIsEnabled = !!(
    env.FCM_SERVER_KEY ||
    (env.APNS_KEY_ID && env.APNS_TEAM_ID)
  )

  return {
    // Server
    serverPort: env.PORT,
    serverNodeEnv: nodeEnv,
    serverIsDevelopment: nodeEnv === 'development',
    serverIsProduction: nodeEnv === 'production',
    serverIsTest: nodeEnv === 'test',

    // Database
    databaseUrl: env.DATABASE_URL,

    // RabbitMQ
    rabbitmqUrl: env.RABBITMQ_URL,

    // Email
    emailHost: env.SMTP_HOST,
    emailPort: env.SMTP_PORT,
    emailUser: env.SMTP_USER,
    emailPass: env.SMTP_PASS,

    // SMS (Twilio)
    smsAccountSid: env.TWILIO_ACCOUNT_SID,
    smsAuthToken: env.TWILIO_AUTH_TOKEN,
    smsPhoneNumber: env.TWILIO_PHONE_NUMBER,
    smsIsEnabled,

    // Push Notifications (FCM)
    pushFcmServerKey: env.FCM_SERVER_KEY,

    // Push Notifications (APNS)
    pushApnsKeyId: env.APNS_KEY_ID,
    pushApnsTeamId: env.APNS_TEAM_ID,

    // Push Notifications
    pushIsEnabled,
  }
}
