# @repo/env-config

Type-safe environment configuration layer for the monorepo.

## Features

- ✅ Type-safe environment variables
- ✅ Zod validation with clear error messages
- ✅ Centralized configuration management
- ✅ Default values
- ✅ Optional configurations (database, email, SMS, etc.)
- ✅ Cached for performance

## Usage

### Basic Usage

```typescript
import { loadConfig } from '@repo/env-config'

// Load and validate environment variables
const config = loadConfig()

// Access configuration (flat structure with prefixes)
console.log(`Server running on port ${config.serverPort}`)
console.log(`Environment: ${config.serverNodeEnv}`)

if (config.databaseUrl) {
  console.log(`Database URL: ${config.databaseUrl}`)
}
```

### Using in Your App

```typescript
import { loadConfig, getConfig } from '@repo/env-config'

// Load config at app startup
// This automatically loads .env files
const config = loadConfig()

// Later, anywhere in your app
const config = getConfig()

if (config.smsIsEnabled) {
  // SMS is configured and ready to use
  sendSMS(config.smsAccountSid!, config.smsAuthToken!, message)
}

if (config.pushIsEnabled) {
  // Push notifications are configured
  if (config.pushFcmServerKey) {
    sendFCMNotification(config.pushFcmServerKey, payload)
  }
}
```

**Note:** You don't need to import `dotenv/config` separately - the env-config package handles loading `.env` files automatically when you call `loadConfig()`.

## Configuration Structure

Flat structure with prefixes to indicate grouping:

```typescript
{
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
```

## Required Environment Variables

- `NODE_ENV` (default: 'development')
- `PORT` (default: 3001)

## Optional Environment Variables

All other variables are optional and will be `undefined` if not provided:

- `DATABASE_URL`
- `RABBITMQ_URL`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`
- `FCM_SERVER_KEY`
- `APNS_KEY_ID`, `APNS_TEAM_ID`

## Error Handling

If environment variables are invalid, `loadConfig()` will throw an error with details:

```typescript
try {
  const config = loadConfig()
} catch (error) {
  console.error('Failed to load configuration:', error)
  process.exit(1)
}
```

## Testing

```typescript
import { loadConfig, resetConfig } from '@repo/env-config'

beforeEach(() => {
  resetConfig() // Clear cached config
})

test('loads config', () => {
  process.env.PORT = '4000'
  const config = loadConfig()
  expect(config.server.port).toBe(4000)
})
```
