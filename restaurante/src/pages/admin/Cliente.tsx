/* eslint-disable @typescript-eslint/no-explicit-any */
import './../../Default.css';
import './Cliente.css';
import { api } from '../../Server/api';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import React from 'react';



export type ClienteType = {
    idUsuario: number;
    nomeUsuario: string;
    email: string;
    funcao: string;
    cpf: string;
    contato: string;
    endereco: string;
    senha?: string; 
};


function Cliente() {
    const [clientes, setClientes] = useState<ClienteType[]>([]);
    const { register, handleSubmit, reset } = useForm();
    // const [inputID, setInputID] = useState();

    const Navigate = useNavigate();

    const onSubmit = async (data:any) => {

        try {
            // chama post para adicionar no bnco de dados
            await api.post("/users", { 
                funcao: "cliente",
                ...data
             });

            // reseta os campos do formulário
            reset();
        } catch (error) {
            console.log("Ocorreu um erro", error);
        }        
    };

    const fetchAllClientes = async () => {

        try {
            const response = await api.get("/users");
            setClientes(response.data);
        } catch(error) {
            console.log("Ocorreu um erro ",error);
        }
    
    };


    // tentativa de criar a busca pelo id do usuário
    // const fetchCliente = async (data:any) => {
    //     console.log(data)
    //     try {
    //         const response = await api.get(`/users/${data.idUsuario}`);

    //         setClientes(response.data);
    //     } catch(error) {
    //         console.log("Ocorreu um erro ",error);
    //     }
    // };

    const EditarCliente = (id:number) => {
        Navigate(`/admin/clientes/ClienteSelecionado/${id}`);
    };

    const ExcluirCliente = async (id:number) => {
        await api.delete(`/users/${id}`);
    }

    useEffect(() => {
        fetchAllClientes();
    },[clientes]);

    return (
        <div className='tela'>
            <header className='header'>SavoryBistro</header>
            <main className='content'>
                <h1 className='title1'>Clientes</h1>

                <h3 className='title2'>Adicionar cliente</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("nomeUsuario")} type="text" placeholder="Nome" />
                    <input {...register("contato")} type="text" placeholder="Contato" />
                    <input {...register("endereco")} type="text" placeholder="Endereço" />
                    <input {...register("cpf")} type="text" placeholder="CPF" />
                    <input {...register("email")} type="text" placeholder="Email" />
                    <input {...register("senha")} type="password" placeholder="senha" />

                    <input type="submit" value="Adicionar"/>
                </form>

                <table>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Função</th>
                        <th>CPF</th>
                        <th>Contato</th>
                        <th>Endereço</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map(cliente => (
                        <tr key={cliente.idUsuario}>
                            <td>{cliente.idUsuario}</td>
                            <td>{cliente.nomeUsuario}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.funcao}</td>
                            <td>{cliente.cpf}</td>
                            <td>{cliente.contato}</td>
                            <td>{cliente.endereco}</td>
                            <td> 
                                <button onClick={() => EditarCliente(cliente.idUsuario)}>
                                    Editar
                                </button>
                                <button onClick={() => ExcluirCliente(cliente.idUsuario)}>
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

export default Cliente;