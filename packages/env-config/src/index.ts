import { config as dotenvConfig } from 'dotenv'
import { envSchema } from './env.schema.js'
import { createConfig } from './config.js'
import type { AppConfig } from './config.js'

export type { AppConfig } from './config.js'
export { envSchema } from './env.schema.js'

let cachedConfig: AppConfig | null = null
let dotenvLoaded = false

/**
 * Load and validate environment variables
 * Automatically loads .env files if not already loaded
 * Throws an error if validation fails
 */
export function loadConfig(): AppConfig {
  if (cachedConfig) {
    return cachedConfig
  }

  // Load .env file if not already loaded
  if (!dotenvLoaded) {
    dotenvConfig()
    dotenvLoaded = true
  }

  try {
    const env = envSchema.parse(process.env)
    cachedConfig = createConfig(env)
    return cachedConfig
  } catch (error) {
    console.error('❌ Invalid environment variables:')
    console.error(error)
    throw new Error('Failed to load configuration')
  }
}

/**
 * Get the cached configuration
 * Throws if config hasn't been loaded yet
 */
export function getConfig(): AppConfig {
  if (!cachedConfig) {
    throw new Error(
      'Configuration not loaded. Call loadConfig() first.'
    )
  }
  return cachedConfig
}

/**
 * Reset the cached configuration (useful for testing)
 */
export function resetConfig(): void {
  cachedConfig = null
}
