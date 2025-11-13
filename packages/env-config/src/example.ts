/**
 * Example usage of @repo/env-config
 *
 * This file demonstrates how to use the env-config package
 * in your applications.
 */

import { loadConfig, getConfig } from './index.js'

// Example 1: Load config at app startup
function initializeApp() {
  try {
    const config = loadConfig()
    console.log(`Starting app on port ${config.serverPort}`)
    return config
  } catch {
    console.error('Failed to load configuration')
    process.exit(1)
  }
}

// Example 2: Access config in other modules
function sendEmail() {
  const config = getConfig()

  if (!config.emailHost || !config.emailPort) {
    throw new Error('Email is not configured')
  }

  console.log(`Sending email via ${config.emailHost}:${config.emailPort}`)
  // Your email sending logic here
}

// Example 3: Conditional features based on config
function setupNotifications() {
  const config = getConfig()

  if (config.smsIsEnabled) {
    console.log('Setting up SMS notifications...')
    console.log(`Using Twilio account: ${config.smsAccountSid}`)
    // Initialize SMS service with config.smsAccountSid, etc.
  }

  if (config.pushIsEnabled) {
    if (config.pushFcmServerKey) {
      console.log('Setting up FCM push notifications...')
      // Initialize FCM with config.pushFcmServerKey
    }
    if (config.pushApnsKeyId && config.pushApnsTeamId) {
      console.log('Setting up APNS push notifications...')
      // Initialize APNS with config.pushApnsKeyId, etc.
    }
  }
}

// Example 4: Environment-specific logic
function setupMiddleware() {
  const config = getConfig()

  if (config.serverIsDevelopment) {
    console.log('Development mode: enabling detailed logging')
    // Add development middleware
  }

  if (config.serverIsProduction) {
    console.log('Production mode: enabling security headers')
    // Add production middleware
  }
}

// Example 5: Database connection
async function connectToDatabase() {
  const config = getConfig()

  if (!config.databaseUrl) {
    console.warn('Database not configured, skipping connection')
    return null
  }

  console.log('Connecting to database...')
  // Your database connection logic here
  // const client = new PostgresClient(config.databaseUrl)
  // await client.connect()
}

export {
  initializeApp,
  sendEmail,
  setupNotifications,
  setupMiddleware,
  connectToDatabase,
}
