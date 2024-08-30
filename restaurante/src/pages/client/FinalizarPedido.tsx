// FinalizarPedido.tsx
import './../../Default.css';
import './FinalizarPedido.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Prato } from '../../components/PratosTable';
import React from 'react';

function FinalizarPedido() {
    const location = useLocation();
    const cart = (location.state as { cart: Prato[] }).cart || [];
    const navigate = useNavigate();

    const totalValue = cart.reduce((total, prato) => total + prato.valorPrato, 0).toFixed(2);

    const handlePurchase = () => {
        alert('Compra realizada com sucesso!');
        // lembrar de configurar o pedido!!!!!!!!!!!!

        navigate('/pratos'); 
    };

    return (
        <div className='layout'>
            <header className='header'>SavoryBistro</header>
            <main className='content'>
                <h1 className='title1'>Finalizar Pedido</h1>
                {cart.length > 0 ? (
                    <>
                        <table className="pratos-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((prato, index) => (
                                    <tr key={index}>
                                        <td>{prato.idPrato}</td>
                                        <td>{prato.nome}</td>
                                        <td>{prato.valorPrato.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <h2 className='title2'>Valor Total: R$ {totalValue}</h2>
                        <button onClick={handlePurchase}>Comprar</button>
                    </>
                ) : (
                    <p>O carrinho está vazio.</p>
                )}
            </main>
            <footer className="footer">Cliente</footer>
        </div>
    );
}

export default FinalizarPedido;
