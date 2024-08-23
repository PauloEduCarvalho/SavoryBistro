// Importa Sequelize do pacote sequelize para configurar e gerenciar a conexão com o banco de dados
import { Sequelize } from 'sequelize';

// Importa as funções para criar os modelos User, Dish e Order
import { createUserModel } from '../model/userSchema.js';
import { createDishModel } from '../model/dishSchema.js'; // Importe a função para criar o modelo de Dish
import { createOrderModel } from '../model/orderSchema.js';

// Cria uma instância do Sequelize para conectar ao banco de dados PostgreSQL
const sequelize = new Sequelize('Restaurante', 'postgres', 'lariel123', {
    host: 'localhost', // Endereço do servidor de banco de dados
    dialect: 'postgres' // Dialeto do banco de dados, neste caso PostgreSQL
});

// Inicializa variáveis para armazenar os modelos
let UserModel = null;
let DishModel = null; // Inicialize a variável para o modelo de Dish
let OrderModel = null;

// Função assíncrona para conectar ao banco de dados e sincronizar os modelos
const connection = async () => {
    try {
        // Tenta autenticar a conexão com o banco de dados
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        
        // Cria os modelos e associa os modelos às variáveis
        UserModel = await createUserModel(sequelize);
        DishModel = await createDishModel(sequelize); // Crie o modelo de Dish
        OrderModel = await createOrderModel(sequelize);

        // Sincroniza os modelos com o banco de dados, alterando a estrutura sem excluir dados
        await sequelize.sync({ alter: true });
        console.log("Database Synced");
    } catch (error) {
        // Se ocorrer um erro na conexão ou sincronização, loga o erro
        console.error('Unable to connect to the database:', error);
    }
}

// Exporta a função de conexão e os modelos criados
export {
    connection,
    UserModel,
    DishModel, // Exporte o modelo de Dish
    OrderModel
}