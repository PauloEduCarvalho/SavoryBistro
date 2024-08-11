import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <body>
      <main className = 'centralize'>
          <h1 className = 'title'>SavoryBistro</h1>
          <div className='container'>
            <h1 className='login'>Login</h1>
            <input type="email" placeholder="Digite o e-mail" />
            <input type="password" placeholder="Digite a senha" />
            <button>Entrar</button>
          </div>
      </main>
    </body>
  );
}

export default App;
