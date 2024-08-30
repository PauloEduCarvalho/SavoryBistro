import { DataTypes } from "sequelize";

export const createOrderModel = async (sequelize, User, Dish) => {
    const Order = sequelize.define('Order', {
        numeroPedido: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nomeDoUsuario: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dataPedido: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        valorTotalPedido: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        idUsuario: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'idUsuario'
            }
        }
    }, {
        tableName: 'pedidos',
        timestamps: false
    });

    // Associação com User (um pedido pertence a um usuário)
    Order.belongsTo(User, { foreignKey: 'idUsuario' });

    // Associação muitos-para-muitos com Dish via OrderDish
    if (Dish) {
        Order.belongsToMany(Dish, { through: 'OrderDish', foreignKey: 'numeroPedido', as: 'Dishes' });
    }

    return Order;
};
