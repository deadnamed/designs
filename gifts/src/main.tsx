import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './frontpage/App.tsx'
import './index.css'
import Router from './PageRouter.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)
