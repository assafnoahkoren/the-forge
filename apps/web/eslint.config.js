import { config as baseConfig } from '@repo/eslint-config/react-internal'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  ...baseConfig,
])
