import './../../Default.css';
import './Pratos.css';
import PratosTable from '../../components/PratosTable';

function Pratos() {
    return (
        <div className='layout'>
        <header className='header'>SavoryBistro</header>
        {/* default.css personaliza até o content */}
        <main className='content'>
            <h1 className='title1'>Pratos</h1>
            <h3 className='title2'>Cadastrar Prato</h3>
            <div className='addContent'>
                <input type="text" placeholder="ID_Prato" />
                <input type="text" placeholder="Nome" />
                <input type="text" placeholder="Valor" />
                <input type="text" placeholder="Custo_Prod" />
                <button className="edit">Adicionar</button>
            </div>

            <h3 className='title2'>Consultar prato</h3>
            <div className='findContent'>
                <input type="text" placeholder="Digite o nome" />
                <button className="find">Consultar</button>
            </div>

            <h3 className='title2'>Lista</h3>
            <PratosTable />


        </main>
        <footer className="footer">Admin</footer>
        </div>
    );

}

export default Pratos;