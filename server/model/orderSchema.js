import { DataTypes } from "sequelize";
import { createDishModel } from './dishSchema.js';
import { createUserModel } from './userSchema.js';

export const createOrderModel = async (sequelize) => {

    const Dish = await createDishModel(sequelize);
    const User = await createUserModel(sequelize);
    
    const Order = sequelize.define('Order', {   
        numeroPedido: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nomeDoCliente: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dataPedido: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW, 
        },
        valorTotalPedido: {
            type: DataTypes.DECIMAL, // Use DECIMAL para valores monetários
            allowNull: false,
        },
        idUser: {
            type: DataTypes.INTEGER,
            references: {
                model: User, 
                key: 'idUser'
            }
        },
        idPrato: {
            type: DataTypes.INTEGER,
            references: {
                model: Dish, 
                key: 'idPrato' 
            }
        }
    }, {
        tableName: 'pedidos', // Nome da tabela no banco de dados
        timestamps: false // Não criar as colunas createdAt e updatedAt
    });

    // Definindo relações
    Order.belongsTo(Dish, { foreignKey: 'idPrato' });
    Order.belongsTo(User, { foreignKey: 'idUser' }); // Certifique-se de que 'idUsuario' é o nome correto do campo de referência

    return Order;
};
