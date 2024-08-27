
import LoginPage from './pages/home/LoginPage'
import RegisterPage from './pages/home/RegisterPage';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Pratos from './pages/admin/Pratos';
import FinalizarPedido from './pages/client/FinalizarPedido';
import PratosCliente from './pages/client/PratosCliente';
import Clientes from './pages/admin/Cliente';  
import ClienteSelecionado from './pages/admin/ClienteSelecionado';

function App() {
  return (
    // definir rotas para navegação entre as páginas
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin/pratos" element={<Pratos />} />
        <Route path="/finalizar-pedido" element={<FinalizarPedido />} />
        <Route path="/pratos" element={<PratosCliente />} />
        <Route path="/admin/menu" element={<PratosCliente />} />
        <Route path="/admin/clientes" element={<Clientes />} />
        <Route path="/admin/clientes/clienteSelecionado/:id" element={<ClienteSelecionado />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
