
import LoginPage from './pages/home/LoginPage'
import RegisterPage from './pages/home/RegisterPage';
import {BrowserRouter, Route, Routes, } from 'react-router-dom';
import Pratos from './pages/admin/Pratos';
import FinalizarPedido from './pages/client/FinalizarPedido';
import PratosCliente from './pages/client/PratosCliente';
import Clientes from './pages/admin/Cliente';  
import ClienteSelecionado from './pages/admin/ClienteSelecionado';
import Menu from './pages/admin/Menu';
import Pedidos from './pages/admin/Pedidos';
import PratoSelecionado from './pages/admin/PratoSelecionado';
import PedidoSelecionado from './pages/admin/PedidoSelecionado';

import React from 'react';
import { UserProvider } from './hooks/useLogin';

function App() {

 
  return (
    <UserProvider>  
        <BrowserRouter>
          <Routes>
            <Route path="" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin/pratos" element={<Pratos />} />
            <Route path="/finalizar-pedido" element={<FinalizarPedido />} />
            <Route path="/pratos" element={<PratosCliente />} />
            <Route path='/admin/pedidos' element={<Pedidos/>} />
            <Route path="/admin/menu" element={<Menu />} />
            <Route path="/admin/clientes" element={<Clientes />} />
            <Route path="/admin/clientes/clienteSelecionado/:id" element={<ClienteSelecionado />} />
            <Route path="/admin/pratos/pratoSelecionado/:id" element={<PratoSelecionado/> } />
            <Route path= "/admin/pedidos/pedidoSelecionado/:id" element={<PedidoSelecionado/>} />
        </Routes>
      </BrowserRouter>
    </UserProvider>


  );
}

export default App;
