import { Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import DetalhesWrapper from './detalhesWrapper';
import Error from './pages/error';
import Cadastro from './pages/cadastro';
import Login from './pages/login';

export default function RoutesConfig() {
    return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='produtoDetalhes/:codigo' element={<DetalhesWrapper />} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/login' element={<Login />} />
        <Route path='error' element={<Error />} />
        <Route path='*' element={<Error />} />
      </Routes>
    );
}