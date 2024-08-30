import { Sequelize } from 'sequelize';
import { createUserModel } from '../model/userSchema.js';
import { createDishModel } from '../model/dishSchema.js';
import { createOrderModel } from '../model/orderSchema.js';
import { createOrderDishModel } from '../model/orderDishSchema.js'; 


const sequelize = new Sequelize('Restaurante', 'postgres', 'lariel123', {
    host: 'localhost',
    dialect: 'postgres'
});

let UserModel = null;
let DishModel = null;
let OrderModel = null;

const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        UserModel = await createUserModel(sequelize);
        DishModel = await createDishModel(sequelize, UserModel); 
        OrderModel = await createOrderModel(sequelize, UserModel, DishModel);
        await createOrderDishModel(sequelize); 


        await sequelize.sync({ alter: true });
        console.log("Database Synced");
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export {
    connection,
    UserModel,
    DishModel,
    OrderModel
};
