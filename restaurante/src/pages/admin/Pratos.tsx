import React, { useEffect, useState } from 'react';
import { Prato } from '../../components/PratosTable'; // Importa a interface Prato
import './../../Default.css';
import './Pratos.css';
import PratosTable from '../../components/PratosTable';
import { api } from '../../Server/api';

function Pratos() {
    const [pratos, setPratos] = useState<Prato[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchAllPratos = async () => {
        try {
            const response = await api.get("/dishes");
            console.log(response);
            setPratos(response.data);
        } catch (error) {
            console.log("Ocorreu um erro ",error);
        }
    };

    useEffect(() => {
        fetchAllPratos();
    }, []);

    return (
        <div className='tela'>
            <header className='header'>SavoryBistro</header>
            <main className='content'>
                <h1 className='title1'>Pratos</h1>
                <h3 className='title2'>Cadastrar Prato</h3>
                <div className='addContent'>
                    <input type="text" placeholder="ID_Prato" />
                    <input type="text" placeholder="Nome" />
                    <input type="text" placeholder="Valor" />
                    <input type="text" placeholder="Custo_Prod" />
                    <button className="edit">Adicionar</button>
                </div>

                <h3 className='title2'>Consultar prato</h3>
                <div className='findContent'>
                    <input type="text" placeholder="Digite o nome" />
                    <button className="find">Consultar</button>
                </div>

                <h3 className='title2'>Lista</h3>
                {error ? <p className="error">{error}</p> : <PratosTable pratos={pratos} refreshPratos={fetchAllPratos} />}

            </main>
            <footer className="footer">Admin</footer>
        </div>
    );
}

export default Pratos;
