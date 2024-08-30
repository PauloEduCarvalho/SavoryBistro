/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {useParams } from 'react-router';
import { api } from '../../Server/api';
import { useEffect, useState } from 'react';
import { Prato } from '../../components/PratosTable';
import { useForm } from 'react-hook-form';

function PratoSelecionado() {
    const { id } = useParams();

    const [prato, setPrato] = useState<Prato>();

    const { register, handleSubmit } = useForm({ defaultValues: {
        nomePrato: prato?.nome,
        valorPrato: prato?.valorPrato,
        custoProducao: prato?.custoProducao
    }});

    const fetchPrato = async () => {

        try {
            const response = await api.get(`/dishes/${id}`);
            console.log(response.data);
            setPrato(response.data);
        } catch(error) {
            console.log("Ocorreu um erro ",error);
        }
    
    };


    const onSubmit = async (data:any) => {

        try {
            
            await api.put(`/dishes/${id}`, data);
            
        } catch (error) {
            console.log("Ocorreu um erro", error);
        }        
    };



    useEffect(() => {
        fetchPrato();
    }, [prato]);


    return (

        <div>

            <table>
                    <thead>
                        <tr>
                        <th>nome</th>
                        <th>valorPrato</th>
                        <th>custoProducao</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={prato?.idPrato}>
                            <td>{prato?.nome}</td>
                            <td>{prato?.valorPrato}</td>
                            <td>{prato?.custoProducao}</td>
                        </tr>
                    </tbody>
                    </table>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("nomePrato")} type="text" placeholder="Nome" name="nomePrato"/>
                        <input {...register("valorPrato")} type="text" placeholder="Valor" name="valorPrato"/>
                        <input {...register("custoProducao")} type="text" placeholder="CustoProducao" name="custoProducao"/>

                        <input type="submit" value="Editar"/>
                        
                    </form>
        </div>

    );
}


export default PratoSelecionado;

