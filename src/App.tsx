import React from 'react';
import Navbar from './components/static/navbar/Navbar'
import Footer from './components/static/footer/Footer'
import Home from './paginas/home/Home';
import Login from './paginas/login/Login';
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';




function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ minHeight: '100vh' }}>
        <Routes> 
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/footer" element={<Footer />} />
        </Routes>
      </div>
      <Footer />
    </ BrowserRouter >
    
  );
}

export default App;
