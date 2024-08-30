/* eslint-disable @typescript-eslint/no-explicit-any */

import './LoginPage.css'
import { useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useLogin } from '../../hooks/useLogin'
import { useForm } from 'react-hook-form'


function LoginPage() {
  const navigate = useNavigate()
  const { handleSubmit, register } = useForm()
  

  const handleNavigation = (path: string) => {
    navigate(path)
  };

  const { fetchCliente, user, setUser } = useLogin()


  async function login(data:any) {

    if(data.email == "" || data.senha == "" ) {
      alert("Email e senha obrigatórios")
      return 
    }

    fetchCliente(data.email)

    if (user?.email == "admin" && user?.senha == "admin") {
      handleNavigation('/admin/menu')
    } else if(user?.senha == data.senha && user?.email == data.email) {
      handleNavigation('/pratos')
    } else {
      alert("Usuário ou senha incorreto")
    }

  };


  useEffect(() => {
    setUser(null)
  }, [])



  return (
    <body>
      <main className = 'centralize'>
          <h1 className = 'title'>SavoryBistro</h1>
          <div className='container'>
            <h1 className='login'>Login</h1>

            <form onSubmit={handleSubmit(login)}>
                    <input {...register("email")} className="testSubmit" type="text" placeholder="e-mail" />
                    <input {...register("senha")} type="password" placeholder="senha" />
                    <input type="submit" value="Entrar"/>
            </form>

            <button 
                className= 'selectButton'
                onClick={() => handleNavigation('/register')}
                >Cadastrar
            </button>

          </div>
      </main>
    </body>
  );
}

export default LoginPage;
