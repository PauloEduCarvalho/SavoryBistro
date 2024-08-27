
import LoginPage from './pages/home/LoginPage'
import RegisterPage from './pages/home/RegisterPage';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Pratos from './pages/admin/Pratos';
import FinalizarPedido from './pages/client/FinalizarPedido';
import PratosCliente from './pages/client/PratosCliente';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
