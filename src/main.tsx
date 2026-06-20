import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Header from "./assets/components/header"
import { WritePost } from './assets/pages/WritePost.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>   
      <BrowserRouter>
      <Header />   
      <Routes>
        <Route index element={ <App />} />
        <Route path="/Writepost" element={<WritePost />} />
      </Routes>
   </BrowserRouter>
  </StrictMode>,
)
