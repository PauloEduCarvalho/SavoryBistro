import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

function RegisterPage() {
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
    const navigate = useNavigate();

    const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        /* Simula o cadastro de um usuário. */

        setIsSuccess(true);
        setTimeout(() => {
            navigate('pratos'); // Redireciona para a tela Pratos após 2 segundos
        }, 2000);

    };

    return (
        <body>
            <main className='centralize'>
                <h1 className='title'>SavoryBistro</h1>
                <div className='container'>
                    <h1 className='login'>Cadastro</h1>
                    {isSuccess === null ? (
                        <form onSubmit={handleRegister}>
                            <div className='inputRow'>
                                <input className='inputData' type="text" placeholder="Digite o nome" required />
                                <input className='inputData' type="email" placeholder="Digite o e-mail" required />
                            </div>
                            <div className='inputRow'>
                                <input className='inputData' type="text" placeholder="Digite o endereço" required />
                                <input className='inputData' type="text" placeholder="Digite o CPF" required />
                            </div>
                            <div className='inputRow'>
                                <input className='inputData' type="text" placeholder="Digite o contato" required />
                                <input className='inputData' type="password" placeholder="Digite a senha" required />
                            </div>
                            <div className='buttonContainer'>
                                <button className='selectButton' type="submit">Cadastrar</button>
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
