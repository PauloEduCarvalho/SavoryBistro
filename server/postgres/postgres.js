import { Sequelize } from 'sequelize';
import { createUserModel } from '../model/userSchema.js';
import { createDishModel } from '../model/dishSchema.js'; // Importe a função para criar o modelo de Dish
import { createOrderModel } from '../model/orderSchema.js';
const sequelize = new Sequelize('Restaurante', 'postgres', 'lariel123', {
    host: 'localhost',
    dialect: 'postgres'
});

let UserModel = null;
let DishModel = null; // Inicialize a variável para o modelo de Dish
let OrderModel = null;

const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        
        // Crie e associe os modelos
        UserModel = await createUserModel(sequelize);
        DishModel = await createDishModel(sequelize); // Crie o modelo de Dish
        OrderModel = await createOrderModel(sequelize);
        await sequelize.sync({ alter: true }); // Atualiza o banco de dados sem excluir dados
        console.log("Database Synced");
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export {
    connection,
    UserModel,
    DishModel, // Exporte o modelo de Dish
    OrderModel
}

// tabela pedidos nao está sendo criada aparentemente 
// problema de unicidade de chave primaria