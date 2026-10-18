import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as bootstrap from 'bootstrap' 
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Home from './pages/home.tsx'
import Clients from './pages/clients.tsx'
import MyNavbar from './components/navbar.tsx'
import { BrowserRouter,Routes, Route } from 'react-router-dom';


createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
    <BrowserRouter>
        <MyNavbar/>
        <Routes>
          <Route path ="/" element = {<Home/>}/>
          <Route path ="/clients" element = {<Clients/>}/>
        </Routes>
        
    </BrowserRouter>

  </StrictMode>,
)