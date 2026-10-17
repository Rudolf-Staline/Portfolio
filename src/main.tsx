import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/figtree'
import App from './CreativeApp.tsx'
import './creative.css'
import './studio-edition.css'
import './studio-motion.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode><App /></StrictMode>,
)
