import { DataTypes } from "sequelize";

export const createOrderDishModel = async (sequelize) => {
    const OrderDish = sequelize.define('OrderDish', {
        idPedido: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Orders',
                key: 'numeroPedido'
            },
            allowNull: false
        },
        idPrato: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Dishes',
                key: 'idPrato'
            },
            allowNull: false
        }
    }, {
        tableName: 'OrderDish',
        timestamps: false
    });

    return OrderDish;
};
