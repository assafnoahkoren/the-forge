import { ConvexAuthProvider } from '@convex-dev/auth/react'
import { ConvexReactClient } from 'convex/react'
import { type ReactNode } from 'react'

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL)

interface ConvexLayerProps {
  children: ReactNode
}

export function ConvexLayer({ children }: ConvexLayerProps) {
  return <ConvexAuthProvider client={convex}>{children}</ConvexAuthProvider>
}
