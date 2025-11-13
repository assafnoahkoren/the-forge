import type { Config } from "tailwindcss"
import sharedConfig from "@repo/ui/tailwind.config"

const config: Config = {
  ...sharedConfig,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
}

export default config
