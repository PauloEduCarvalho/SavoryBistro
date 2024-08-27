
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';



function LoginPage() {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };



  return (
    <body>
      <main className = 'centralize'>
          <h1 className = 'title'>SavoryBistro</h1>
          <div className='container'>
            <h1 className='login'>Login</h1>
            <input className= 'inputButton' type="email" placeholder="Digite o e-mail" />
            <input className = 'inputButton' type="password" placeholder="Digite a senha" />
            <div className='buttonContainer'>
                <button 
                  className= 'selectButton'
                  onClick={() => handleNavigation('/pratos')}
                  >Entrar
                </button>

                <button 
                  className= 'selectButton'
                  onClick={() => handleNavigation('/register')}
                  >Cadastrar
                </button>
            </div>
          </div>
      </main>
    </body>
  );
}

export default LoginPage;
