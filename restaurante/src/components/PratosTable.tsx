import React, { useEffect, useState } from 'react';

export interface Prato {
  idPrato: number;
  nome: string;
  valorPrato: number;
  custoProducao: number;
}


interface PratosTableProps {
  pratos: Prato[]; // Pratos a serem exibidos
  refreshPratos: () => void; // Função para atualizar a lista de pratos
}

const PratosTable: React.FC<PratosTableProps> = ({ pratos, refreshPratos }) => {
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
              <tr key={prato.idPrato}>
                <td>{prato.idPrato}</td>
                <td>{prato.nome}</td>
                <td> R$ {prato.valorPrato}</td>
                <td> R$ {prato.custoProducao}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>Nenhum prato disponível</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Botão para recarregar os pratos */}
      <button onClick={refreshPratos}>Recarregar Pratos</button>
    </div>
  );
};

export default PratosTable;


