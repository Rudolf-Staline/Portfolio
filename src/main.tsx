import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/manrope'
import App from './App'
import './style.css'
import './project-gallery.css'
import './positioning.css'
import './engineering.css'

const root = document.getElementById('root')!
const app = <StrictMode><App pathname={window.location.pathname}/></StrictMode>
if (root.querySelector('main')) hydrateRoot(root, app)
else createRoot(root).render(app)
