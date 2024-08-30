/* eslint-disable @typescript-eslint/no-explicit-any */
// criar onSubmit para atualizar o pedido
import {useParams } from 'react-router';
import { api } from '../../Server/api';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PedidoType } from './Pedidos';
import React from 'react';

function PedidoSelecionado() {
    const { id } = useParams();

    const [pedido, setPedido] = useState<PedidoType>();

    const { register, handleSubmit } = useForm({ defaultValues: {
        nomeDoCliente: pedido?.nomeDoCliente,
        valorTotalPedido: pedido?.valorTotalPedido,
        idUsuario: pedido?.idUsuario,
        idPrato: pedido?.idPrato
    }});

    const fetchPedido = async () => {

        try {
            const response = await api.get(`/orders/${id}`);
            setPedido(response.data);
        } catch(error) {
            console.log("Ocorreu um erro ",error);
        }
    
    };

    const onSubmit = async (data:any) => {

        try {
            
            await api.put(`/orders/${id}`, data);
            
        } catch (error) {
            console.log("Ocorreu um erro", error);
        }        
    };


    useEffect(() => {
        fetchPedido();
    }, [pedido]);


    return (

        <div>

            <table>
                    <thead>
                        <tr>
                        <th>idUsuario</th>
                        <th>nomeDoCliente</th>
                        <th>valorTotalPedido</th>
                        <th>idUsuario</th>
                        <th>idPrato</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={pedido?.idUsuario}>
                            <td>{pedido?.nomeDoCliente}</td>
                            <td>{pedido?.valorTotalPedido}</td>
                            <td>{pedido?.idUsuario}</td>
                            <td>{pedido?.idPrato}</td>
                        </tr>
                    </tbody>
                    </table>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("nomeDoCliente")} type="text" placeholder="Nome" />
                        <input {...register("valorTotalPedido")} type="text" placeholder="Valor" />
                        <input {...register("idUsuario")} type="text" placeholder="ID usuario" />
                        <input {...register("idPrato")} type="text" placeholder="ID Prato" />

                        <input type="submit" value="Editar"/>
                    </form>
   
        </div>

    );
}


export default PedidoSelecionado;

