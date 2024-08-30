import { DataTypes } from 'sequelize';

export const createDishModel = async (sequelize, Order) => {
    const Dish = sequelize.define('Dish', {
        idPrato: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        valorPrato: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        custoProducao: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    }, {
        timestamps: true,
        tableName: 'pratos'
    });

    // Verifique se Order foi definido corretamente antes de fazer a associação
    if (Order) {
        // Associação muitos-para-muitos com Order via OrderDish
        Dish.belongsToMany(Order, { through: 'OrderDish', foreignKey: 'idPrato' });
    }

    return Dish;
};
