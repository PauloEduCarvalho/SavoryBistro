import './../../Default.css';

import { api } from '../../Server/api';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ClienteSelecionado from './ClienteSelecionado';
import { useNavigate } from 'react-router-dom';




export type PedidoType = {
    nomeDoUsuario: number;
    valorTotalPerdido: string;
    idUsuario: number;
    idPrato: number;
};






function Pedidos() {
    const [pedidos, setPedido] = useState<PedidoType[]>([]);
    const { register, handleSubmit, reset } = useForm();
    const [inputID, setInputID] = useState();

    const Navigate = useNavigate();

    const onSubmit = async (data:any) => {

        try {
            // chama post para adicionar no bnco de dados
            await api.post("/orders", data);

            // reseta os campos do formulário
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


    // tentativa de criar a busca pelo id do pedido
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
        Navigate(`/admin/pedidos/PedidoSelecionado/${id}`);

    };

    const ExcluirPedido = async (id:number) => {
        await api.delete(`/orders/${id}`);
    }

    useEffect(() => {
        fetchAllPedidos();
    },[pedidos]);

    return (
        <div className='tela'>
            <header className='header'>SavoryBistro</header>
            <main className='content'>
                <h1 className='title1'>Pedido</h1>

                <h3 className='title2'>Adicionar Pedido</h3>
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
                        <th>CPF</th>
                        <th>Contato</th>
                        <th>Endereço</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map(pedidos => (
                        <tr>
                            <td>{pedidos.nomeDoUsuario}</td>
                            <td>{pedidos.valorTotalPerdido}</td>
                            <td>{pedidos.idUsuario}</td>
                            <td>{pedidos.idPrato}</td>
                            <td> 
                                <button onClick={() => EditarPedido(pedidos.idPrato)}>
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