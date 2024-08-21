// model/dishSchema.js
import { DataTypes } from 'sequelize';

// Define o modelo Dish
export const createDishModel = async (sequelize) => {
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
        tableName: 'pratos' // Nome da tabela no banco de dados
    });

    return Dish;
};
