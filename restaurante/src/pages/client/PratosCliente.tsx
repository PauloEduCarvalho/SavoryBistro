import './../../Default.css';
import './PratosCliente.css';
import { Prato } from '../../components/PratosTable';
import { useEffect, useState } from 'react';
import { api } from '../../Server/api';
import { useNavigate } from 'react-router-dom';
import React from 'react';

function PratosCliente() {
    const [dishes, setDishes] = useState<Prato[]>([]);
    const [cart, setCart] = useState<Prato[]>([]);
    const navigate = useNavigate();

    const fetchAllDishes = async () => {
        try {
            const response = await api.get("/dishes");
            setDishes(response.data);
        } catch (error) {
            console.log("Ocorreu um erro ", error);
        }
    };

    useEffect(() => {
        fetchAllDishes();
    }, []);

    const addToCart = (prato: Prato) => {
        setCart([...cart, prato]);
    };

    const handleFinalizeOrder = () => {
        navigate('/finalizar-pedido', { state: { cart } });
    };

    return (
        <div className='layout'>
            <header className='header'>SavoryBistro</header>
            <main className='content'>
                <h1 className='title1'>Pratos</h1>
                <table className="pratos-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Valor</th>

                            <th>Adicionar ao carrinho</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dishes.map((prato) => (
                            <tr key={prato.idPrato}>
                                <td>{prato.idPrato}</td>
                                <td>{prato.nome}</td>
                                <td>{prato.valorPrato.toFixed(2)}</td>
                                <td>
                                    <button onClick={() => addToCart(prato)}>+</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="finalizar" onClick={handleFinalizeOrder}>Finalizar Pedido</button>
            </main>
            <footer className="footer">Cliente</footer>
        </div>
    );
}

export default PratosCliente;
