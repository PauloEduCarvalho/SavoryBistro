/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import './../../Default.css';
import './Pedidos.css';
import { api } from '../../Server/api';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';




export type PedidoType = {
    idPedido: number;
    nomeDoCliente: string;
    valorTotalPedido: number;

    idUsuario: number;
    idPrato: number[] | number;
};


function Pedidos() {
    const [pedidos, setPedido] = useState<PedidoType[]>([]);
    const { register, handleSubmit, reset } = useForm();
    // const [inputID, setInputID] = useState();

    const Navigate = useNavigate();

    const onSubmit = async (data:any) => {

        try {

            await api.post("/orders", data);

            reset();
        } catch (error) {
            console.log("Ocorreu um erro", error);
        }        
    };

    const fetchAllPedidos = async () => {

        try {
            const response = await api.get("/orders");
            setPedido(response.data);
        } catch(error) {
            console.log("Ocorreu um erro ",error);
        }
    
    };


    //tentativa de criar a busca pelo id do pedido
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fetchPedido = async (data:any) => {
        console.log(data)
        try {
            const response = await api.get(`/users/${data.idPedido}`);

            setPedido([response.data]);
        } catch(error) {
            console.log("Ocorreu um erro ",error);
        }
    };

    const EditarPedido = (id:number) => {
        Navigate(`/admin/pedidos/pedidoSelecionado/${id}`);

    };

    const ExcluirPedido = async (id:number) => {
        await api.delete(`/orders/${id}`);
    }

    useEffect(() => {
        fetchAllPedidos();
    },[]);

    return (
        <div className='tela'>
            <header className='header'>SavoryBistro</header>
            <main className='content'>
                <h1 className='title1'>Pedido</h1>

                <h3 className='title2'>Adicionar Pedido</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("nomeDoCliente")} type="text" placeholder="nome" />
                    <input {...register("valorTotalPedido")} type="text" placeholder="valor do pedido" />
                    <input {...register("idUsuario")} type="text" placeholder="id Usuario" />
                    <input {...register("idPrato")} type="text" placeholder="id Prato" />

                    <input type="submit" value="Adicionar"/>
                </form>

                <table>
                    <thead>
                        <tr>
                        <th>Nome</th>
                        <th>Valor Total</th>
                        <th>ID Usuario</th>
                        <th>ID prato</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map(pedidos => (

                        <tr key={pedidos.idPedido}>
                            <td>{pedidos.nomeDoCliente}</td>
                            <td>{pedidos.valorTotalPedido}</td>

                            <td>{pedidos.idUsuario}</td>
                            <td>{pedidos.idPrato}</td>
                            <td> 
                                <button onClick={() => EditarPedido(pedidos.idPedido)}>
                                    Editar
                                </button>
                                <button onClick={() => ExcluirPedido(pedidos.idUsuario)}>
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

export default Pedidos;