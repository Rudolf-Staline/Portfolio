import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/figtree'
import App from './App.tsx'
import './cinema.css'
import './horizontal.css'
import './vertical.css'
import './expanded.css'
import './white-return.css'
import './pedi-inline.css'
import './folio-refresh.css'
import './kinetic-atelier.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
