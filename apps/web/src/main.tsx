import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConvexLayer } from './ConvexLayer.tsx'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConvexLayer>
      <App />
    </ConvexLayer>
  </StrictMode>,
)
