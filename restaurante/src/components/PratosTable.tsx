import React, { useEffect, useState } from 'react';

interface Prato {
  id: number;
  nome: string;
  valor: number;
  custo_prod: number;
}


// teste para carregar os dados de pratos com base no arquivo json
const PratosTable: React.FC = () => {
  const [pratos, setPratos] = useState<Prato[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./../pages/admin/pratos.json');

        const data: Prato[] = await response.json();
        setPratos(data);
      } catch (error) {
        console.error('Erro ao carregar os dados:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome do Prato</th>
            <th>Valor</th>
            <th>Custo de Produção</th>
          </tr>
        </thead>
        <tbody>
          {pratos.length > 0 ? (
            pratos.map(prato => (
              <tr key={prato.id}>
                <td>{prato.id}</td>
                <td>{prato.nome}</td>
                <td>{prato.valor.toFixed(2)} R$</td>
                <td>{prato.custo_prod.toFixed(2)} R$</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>Nenhum prato disponível</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PratosTable;
