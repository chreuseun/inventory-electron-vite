import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import PublicRouter from './routers/PublicRouter'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PublicRouter />
  </React.StrictMode>
)
