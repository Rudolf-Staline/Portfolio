import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/manrope'
import '@fontsource-variable/newsreader'
import '@fontsource-variable/newsreader/wght-italic.css'
import App from './App.tsx'
import './portfolio.css'

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
