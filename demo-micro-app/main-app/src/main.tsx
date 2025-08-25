import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// index.js
import microApp from '@micro-zoe/micro-app'

microApp.start({
  'router-mode': 'history',
  'iframe': true
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
