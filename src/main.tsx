import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // <--- Importante
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* O BrowserRouter tem que abraçar o App */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)