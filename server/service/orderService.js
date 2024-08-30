import { OrderModel, UserModel, DishModel } from '../postgres/postgres.js';

// Função para criar um novo pedido e associar pratos a ele
export const createOrderService = async (orderData) => {
    const { nomeDoUsuario, valorTotalPedido, idUsuario, pratos } = orderData;

    // Validação de dados
    if (valorTotalPedido <= 0) {
        throw new Error('O valor total do pedido deve ser maior que zero.');
    }

    // Cria o pedido com os dados fornecidos
    const newOrder = await OrderModel.create({ 
        nomeDoUsuario, 
        valorTotalPedido, 
        idUsuario
    });

    // Adiciona pratos ao pedido se a lista de pratos estiver presente e não estiver vazia
    if (pratos && pratos.length > 0) {
        await newOrder.addDishes(pratos);
    }

    // Retorna o pedido criado com os pratos associados (carrega a relação com os pratos)
    return newOrder.reload({ include: 'Dishes' });
};


// Função para obter todos os pedidos com seus pratos associados
export const getAllOrdersService = async () => {
    return await OrderModel.findAll({
        include: [
            {
                model: DishModel,
                as: 'Dishes', // Inclui a relação com pratos
                through: { attributes: [] } // Não retorna atributos da tabela intermediária
            }
        ]
    });
};

// Função para obter um pedido específico por ID com seus pratos associados
export const getOrderByIdService = async (id) => {
    return await OrderModel.findByPk(id, {
        include: [
            {
                model: DishModel,
                as: 'Dishes', // Inclui a relação com pratos
                through: { attributes: [] } // Não retorna atributos da tabela intermediária
            }
        ]
    });
};

// Função para atualizar um pedido existente com os novos dados fornecidos
export const updateOrderService = async (id, updatedData) => {
    const order = await OrderModel.findByPk(id); // Busca o pedido pelo ID
    if (order) {
        return await order.update(updatedData); // Atualiza o pedido com os novos dados
    }
    return null; // Retorna null se o pedido não for encontrado
};

// Função para deletar um pedido pelo ID
export const deleteOrderService = async (id) => {
    const order = await OrderModel.findByPk(id); // Busca o pedido pelo ID
    if (order) {
        await order.destroy(); // Deleta o pedido
        return true; // Retorna true se o pedido foi deletado com sucesso
    }
    return false; // Retorna false se o pedido não for encontrado
};
