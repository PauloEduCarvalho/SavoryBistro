import './../../Default.css';
import './Menu.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';

function Menu() {
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <div className='tela'>
            <header className='header'>SavoryBistro</header>
            <div className="containerButton">
                <button className='navButton' onClick={() => handleNavigation('/admin/pratos')}>Pratos</button>
                <button className='navButton' onClick={() => handleNavigation('/admin/pedidos')}>Pedidos</button>
                <button className='navButton' onClick={() => handleNavigation('/admin/clientes')}>Clientes</button>
                <button className='navButton' onClick={() => handleNavigation('/gerarRelatorio')}>Gerar Relatório</button>
            </div>
            <footer className="footer">Admin</footer>
        </div>
    );
}

export default Menu;
