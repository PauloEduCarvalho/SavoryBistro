import {useParams } from 'react-router';
import { api } from '../../Server/api';
import { useEffect, useState } from 'react';
import { ClienteType } from './Cliente';
import { useForm } from 'react-hook-form';

function ClienteSelecionado() {
    const { id } = useParams();

    const [cliente, setCliente] = useState<ClienteType>();

    const { register, handleSubmit } = useForm({ defaultValues: {
        nomeUsuario: cliente?.nomeUsuario,
        email: cliente?.email,
        endereco: cliente?.endereco,
        contato: cliente?.contato,
        cpf: cliente?.cpf
    }});

    const fetchCliente = async () => {

        try {
            const response = await api.get(`/users/${id}`);
            console.log(response.data);
            setCliente(response.data);
        } catch(error) {
            console.log("Ocorreu um erro ",error);
        }
    
    };

    const onSubmit = async (data:any) => {

        try {
            
            await api.put(`/users/${id}`, data);
            

            
            
        } catch (error) {
            console.log("Ocorreu um erro", error);
        }        
    };


    useEffect(() => {
        fetchCliente();
    }, [cliente]);





    return (

        <div>

            <table>
                    <thead>
                        <tr>
                        <th>nome</th>
                        <th>email</th>
                        <th>endereco</th>
                        <th>contato</th>
                        <th>CPF</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={cliente?.idUsuario}>
                            <td>{cliente?.nomeUsuario}</td>
                            <td>{cliente?.email}</td>
                            <td>{cliente?.endereco}</td>
                            <td>{cliente?.contato}</td>
                            <td>{cliente?.cpf}</td>
                        </tr>
                    </tbody>
                    </table>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("nomeUsuario")} type="text" placeholder="Nome" name="nomeUsuario"/>
                        <input {...register("email")} type="text" placeholder="Email" name="email"/>
                        <input {...register("endereco")} type="text" placeholder="Endereço" name="endereco"/>
                        <input {...register("contato")} type="text" placeholder="Contato" name="contato"/>
                        <input {...register("cpf")} type="text" placeholder="CPF" name="cpf"/>

                        <input type="submit" value="Editar"/>
                        
                    </form>




            
        </div>

    );
}


export default ClienteSelecionado;

