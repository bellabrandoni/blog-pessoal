import React from 'react';
import Navbar from './components/static/navbar/Navbar'
import Footer from './components/static/footer/Footer'
import Home from './paginas/home/Home';
import Login from './paginas/login/Login';
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import CadastroUsuario from './paginas/cadastroUsuario/CadastroUsuario';




function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        <Route path="/" element={<Login  />} />

        <Route path="/home" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/cadastrousuario" element={<CadastroUsuario/>} />

      </Routes>
      <Footer />
    </BrowserRouter>

  );
}

export default App;
