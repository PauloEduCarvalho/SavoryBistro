// Importa DataTypes do Sequelize para definir os tipos de dados dos campos
import { DataTypes } from "sequelize";
// Importa as funções para criar os modelos Dish e User
import { createDishModel } from './dishSchema.js';
import { createUserModel } from './userSchema.js';

// Função para criar o modelo 'Order'
export const createOrderModel = async (sequelize) => {
    // Cria os modelos Dish e User usando as funções importadas
    const Dish = await createDishModel(sequelize);
    const User = await createUserModel(sequelize);

    // Define o modelo 'Order' usando o Sequelize
    const Order = sequelize.define('Order', {   
        // Define a coluna 'numeroPedido' como chave primária e auto-incremento
        numeroPedido: {
            type: DataTypes.INTEGER, // Tipo de dado INTEGER para o número do pedido
            primaryKey: true, // Define como chave primária
            autoIncrement: true, // O valor será auto-incrementado
        },
        // Define a coluna 'nomeDoCliente' para o nome do cliente
        nomeDoCliente: {
            type: DataTypes.STRING, // Tipo de dado STRING para o nome do cliente
            allowNull: false, // Não permite valores nulos
        },
        // Define a coluna 'dataPedido' para a data do pedido
        dataPedido: {
            type: DataTypes.DATE, // Tipo de dado DATE para a data do pedido
            allowNull: false, // Não permite valores nulos
            defaultValue: DataTypes.NOW // Define o valor padrão como a data atual
        },
        // Define a coluna 'valorTotalPedido' para o valor total do pedido
        valorTotalPedido: {
            type: DataTypes.DECIMAL, // Tipo de dado DECIMAL para valores monetários
            allowNull: false, // Não permite valores nulos
        },
        // Define a coluna 'idUsuario' como uma referência ao modelo User
        idUsuario: {
            type: DataTypes.INTEGER, // Tipo de dado INTEGER para o ID do usuário
            references: {
                model: User, // Define o modelo referenciado como User
                key: 'idUsuario' // Define o campo de referência no modelo User
            }
        },
        // Define a coluna 'idPrato' como uma referência ao modelo Dish
        idPrato: {
            type: DataTypes.INTEGER, // Tipo de dado INTEGER para o ID do prato
            references: {
                model: Dish, // Define o modelo referenciado como Dish
                key: 'idPrato' // Define o campo de referência no modelo Dish
                //mesmo pedido ter mais de um id de prato
            }
        }
    }, {
        // Configurações adicionais para o modelo
        tablenomeUsuario: 'pedidos', // Define o nome da tabela no banco de dados como 'pedidos'
        timestamps: false // Não cria as colunas createdAt e updatedAt
    });

    // Define a relação de associação entre Order e Dish
    Order.belongsTo(Dish, { foreignKey: 'idPrato' });
    // Define a relação de associação entre Order e User
    Order.belongsTo(User, { foreignKey: 'idUsuario' }); // Certifique-se de que 'idUsuario' é o nome correto do campo de referência

    return Order; // Retorna o modelo 'Order' criado
};
