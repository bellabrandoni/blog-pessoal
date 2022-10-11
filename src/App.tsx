import React from 'react';
import Navbar from './components/static/navbar/Navbar'
import Footer from './components/static/footer/Footer'
import Home from './paginas/home/Home';
import Login from './paginas/login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import CadastroUsuario from './paginas/cadastroUsuario/CadastroUsuario';
import ListaPostagem from './components/postagens/listapostagem/ListaPostagem';
import ListaTema from './components/temas/listatema/ListaTema';
import CadastroPost from './components/postagens/cadastroPost/CadastroPost';
import CadastroTema from './components/temas/cadastroTema/CadastroTema';
import DeletarPostagem from './components/postagens/deletarPostagem/DeletarPostagem';
import DeletarTema from './components/temas/deletarTema/DeletarTema';
import { Provider } from 'react-redux';
import store from './store/store';




function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/home" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/cadastrousuario" element={<CadastroUsuario />} />

        <Route path="/temas" element={<ListaTema />} />

        <Route path="/posts" element={<ListaPostagem />} />

        <Route path="/formularioPostagem" element={<CadastroPost />} />

<Route path="/formularioPostagem/:id" element={<CadastroPost />} />

<Route path="/formularioTema" element={<CadastroTema />} />

<Route path="/formularioTema/:id" element={<CadastroTema />} />

<Route path="/deletarPostagem/:id" element={<DeletarPostagem />} />

<Route path="/deletarTema/:id" element={<DeletarTema />} />

      </Routes>
      <Footer />
    </BrowserRouter>
    </Provider>
  );
}

export default App;
