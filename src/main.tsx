import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './WhiteEditorial.tsx'
import './white-editorial.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode><App /></StrictMode>,
)
