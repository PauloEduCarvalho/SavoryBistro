/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import { api } from '../../Server/api';
import { useForm } from 'react-hook-form';

function RegisterPage() {
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
    const navigate = useNavigate();
    // const [cliente, setCliente] = useState<ClienteType>();
    const { register, handleSubmit} = useForm();



    const onSubmit = async (data:any) => {

        try {

            // chama post para adicionar no bnco de dados
            await api.post("/users", {
                funcao: "cliente",
                ...data
            });

            setIsSuccess(true);
            setTimeout(() => {
                navigate('/'); // Redireciona para a tela Pratos após 2 segundos
            }, 2000);

        } catch (error) {
            console.log("Ocorreu um erro", error);
        }        
    };



    return (
        <body>
            <main className='centralize'>
                <h1 className='title'>SavoryBistro</h1>
                <div className='container'>
                    <h1 className='login'>Cadastro</h1>
                    {isSuccess === null ? (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='inputRow'>
                                <input {...register("nomeUsuario")} className='inputForm' type="text" placeholder="Digite o nome" required />
                                <input {...register("email")} className='inputForm' type="email" placeholder="Digite o e-mail" required />
                            </div>
                            <div className='inputRow'>
                                <input {...register("endereco")} className='inputForm' type="text" placeholder="Digite o endereço" required />
                                <input {...register("cpf")} className='inputForm' type="text" placeholder="Digite o CPF" required />
                            </div>
                            <div className='inputRow'>
                                <input {...register("contato")} className='inputForm' type="text" placeholder="Digite o contato" required />
                                <input {...register("senha")} className='inputForm' type="password" placeholder="Digite a senha" required />
                            </div>
                            <div className='buttonContainer'>
                                <input className='registerButton' type="submit" value="Cadastrar"/>
                            </div>
                        </form>
                    ) : isSuccess ? (
                        <h2>Conta criada com sucesso!</h2>
                    ) : (
                        <h2>Erro ao criar a conta. Tente novamente.</h2>
                    )}
                </div>
            </main>
        </body>
    );
}

export default RegisterPage;
