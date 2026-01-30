import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // <--- IMPORTANTE
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* O BrowserRouter TEM que abraçar o App, senão dá tela branca */}
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)