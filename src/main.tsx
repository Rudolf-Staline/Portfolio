import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './cinema.css'
import './horizontal.css'
import './vertical.css'
import './expanded.css'
import './pages.css'
import './project-refinements.css'
import './motion.css'
import './refine.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
