import './../../Default.css';
import './PratosCliente.css';




function PratosCliente() {
    return (
        <div className='layout'>
        <header className='header'>SavoryBistro</header>
        {/* default.css personaliza até o content */}
        <main className='content'>
            <h1 className='title1'>Pratos</h1>
            

        </main>
        <footer className="footer">Admin</footer>
        </div>
    );

}

export default PratosCliente;