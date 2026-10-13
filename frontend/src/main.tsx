import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as bootstrap from 'bootstrap' 
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.tsx'
import Home from './pages/home.tsx'
import MyNavbar from './components/navbar.tsx'

createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
    <MyNavbar/>
    <Home />
  </StrictMode>,
)