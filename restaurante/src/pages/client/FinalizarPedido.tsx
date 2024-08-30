// FinalizarPedido.tsx
import './../../Default.css';
import './FinalizarPedido.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Prato } from '../../components/PratosTable';
import React from 'react';
import { useLogin } from '../../hooks/useLogin';
import { api } from '../../Server/api';

function FinalizarPedido() {
    const location = useLocation();
    const cart = (location.state as { cart: Prato[] }).cart || [];
    const navigate = useNavigate();

    const user = useLogin();

    const totalValue = cart.reduce((total, prato) => total + prato.valorPrato, 0).toFixed(2);

    const handlePurchase = async () => {
        if(!user) {
            alert('Nenhum cliente logado.')
            return;
        }

        const orderData = {
            nomeDoUsuario: user.getNomeUsuario(),
            valorTotalPedido: parseFloat(totalValue),
            idUsuario: user.getIdUsuario(),
            pratos: cart.map(prato => prato.idPrato),
        };

        try {
            await api.post('/orders', orderData);
            alert('Compra realizada com sucesso!');
            navigate('/pratos'); 
        } catch (error) {
            console.error('Erro ao finalizar a compra:', error);
            alert('Ocorreu um erro ao finalizar a compra.');
        }

        
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
