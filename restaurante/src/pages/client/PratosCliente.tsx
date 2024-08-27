import './../../Default.css';
import './PratosCliente.css';
import { Prato } from './../../components/PratosTable';
import { useEffect, useState } from 'react';
import { api } from '../../Server/api';




function PratosCliente() {

    const [dishes, setDishes] = useState<Prato[]>([]);

    const fetchAllDishes = async () => {

        try {
            const response = await api.get("/dishes");
            setDishes(response.data);
        } catch(error) {
            console.log("Ocorreu um erro ",error);
        }
    
    };

    useEffect(() => {
        fetchAllDishes();
    },[dishes]);


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