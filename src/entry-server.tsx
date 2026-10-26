import { renderToString } from 'react-dom/server'
import App from './App'
export { allRoutes, getMetadata, projectPath, homePath } from './routes'
export { architecture } from './data/architecture'
export { projectVisuals } from './data/projectVisuals'
export const render = (pathname: string) => renderToString(<App pathname={pathname}/> )
