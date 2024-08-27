import React, { useEffect, useState } from 'react';
import { Prato } from '../../components/PratosTable'; // Importa a interface Prato
import './../../Default.css';
import './Pratos.css';
import PratosTable from '../../components/PratosTable';
import { api } from '../../Server/api';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function Pratos() {
    const [pratos, setPratos] = useState<Prato[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { register, handleSubmit, reset } = useForm();
    
    const Navigate = useNavigate();

    const fetchAllPratos = async () => {
        try {
            const response = await api.get("/dishes");
            console.log(response);
            setPratos(response.data);
        } catch (error) {
            console.log("Ocorreu um erro ",error);
        }
    };

    const onSubmit = async (data:any) => {

        try {


            // chama post para adicionar no bnco de dados
            await api.post("/dishes", data
             );

            // reseta os campos do formulário
            reset();
        } catch (error) {
            console.log("Ocorreu um erro", error);
        }        
    };

    const EditarPrato = (id:number) => {
        Navigate(`/admin/pratos/PratoSelecionado/${id}`);
    };

    const ExcluirPrato = async (id:number) => {
        await api.delete(`/dishes/${id}`);
    }

    useEffect(() => {
        fetchAllPratos();
    }, [Pratos]);

    return (
        <div className='tela'>
            <header className='header'>SavoryBistro</header>
            <main className='content'>
                <h1 className='title1'>Pratos</h1>
                <h3 className='title2'>Cadastrar Prato</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("nome")} type="text" placeholder="Nome" />
                    <input {...register("valorPrato")} type="text" placeholder="ValorPrato" />
                    <input {...register("custoProducao")} type="text" placeholder="CustoProducao" />
                    <input type="submit" value="Adicionar"/>
                </form>

                <h3 className='title2'>Lista</h3>
                <table>
                    <thead>
                        <tr>
                        <th>nome</th>
                        <th>valor</th>
                        <th>custoProducao</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pratos.map(pratos => (
                        <tr key={pratos.idPrato}>
                            <td>{pratos.nome}</td>
                            <td>{pratos.valorPrato}</td>
                            <td>{pratos.custoProducao}</td>
                            <td> 
                                <button onClick={() => EditarPrato(pratos.idPrato)}>
                                    Editar
                                </button>
                                <button onClick={() => ExcluirPrato(pratos.idPrato)}>
                                    Excluir
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>

            </main>
            <footer className="footer">Admin</footer>
        </div>
    );
}

export default Pratos;
