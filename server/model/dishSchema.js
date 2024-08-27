// Importa a classe DataTypes do Sequelize para definir os tipos de dados dos campos
import { DataTypes } from 'sequelize';

// Define o modelo Dish
export const createDishModel = async (sequelize) => {
    // Cria o modelo 'Dish' usando o Sequelize, definindo a estrutura da tabela
    const Dish = sequelize.define('Dish', {
        // Define a coluna 'idPrato' como chave primária e auto-incremento
        idPrato: {
            type: DataTypes.INTEGER, // Tipo de dado INTEGER para o ID
            primaryKey: true, // Define como chave primária
            autoIncrement: true // O valor será auto-incrementado
        },
        // Define a coluna 'nome' para o nome do prato
        nome: {
            type: DataTypes.STRING, // Tipo de dado STRING para o nome do prato
            allowNull: false // Não permite valores nulos
        },
        // Define a coluna 'valorPrato' para o valor do prato
        valorPrato: {
            type: DataTypes.DOUBLE, // Tipo de dado DOUBLE para o valor do prato
            allowNull: false // Não permite valores nulos
        },
        // Define a coluna 'custoProducao' para o custo de produção do prato
        custoProducao: {
            type: DataTypes.DOUBLE, // Tipo de dado DOUBLE para o custo de produção
            allowNull: false // Não permite valores nulos
        }
    }, {
        // Configurações adicionais para o modelo
        timestamps: true, // Adiciona colunas de timestamps (createdAt e updatedAt)
        tablenomeUsuario: 'pratos' // Define o nome da tabela no banco de dados
    });

    return Dish; // Retorna o modelo 'Dish' criado
};
