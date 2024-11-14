import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CardDisplay from './components/CardDisplay.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <CardDisplay/>
  </StrictMode>,
)
