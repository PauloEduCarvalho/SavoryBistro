import { DataTypes } from "sequelize";

export const createUserModel = async (sequelize) => {
    const User = sequelize.define('User', {
        idUsuario: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nomeUsuario: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            isLowercase: true,
            unique: true
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        },
        funcao: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        contato: {
            type: DataTypes.STRING,
            allowNull: false
        },
        endereco: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        // Configurações adicionais para o modelo
        tableName: 'usuarios', // Define o nome da tabela no banco de dados
        timestamps: true // Adiciona colunas createdAt e updatedAt para rastreamento de alterações
    });

    return User;
};
