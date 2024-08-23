// Importa os modelos necessários do módulo PostgreSQL
import { OrderModel, UserModel, DishModel } from '../postgres/postgres.js';

// Função para criar um novo pedido
export const createOrder = async (req, res) => {
    // Extrai os campos do corpo da requisição
    const { nomeDoCliente, valorTotalPedido, idUsuario, idPrato } = req.body;
    console.log("Received data:", req.body);

    // Verifica se todos os campos obrigatórios estão presentes
    if (!nomeDoCliente || !valorTotalPedido || !idUsuario || !idPrato) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        // Cria um novo pedido no banco de dados
        const newOrder = await OrderModel.create({
            nomeDoCliente,
            valorTotalPedido,
            idUsuario, // Certifica-se de que este é o nome correto do campo no modelo
            idPrato // Certifica-se de que este é o nome correto do campo no modelo
            // dataPedido será preenchido automaticamente
        });
        // Responde com o novo pedido criado e código de status 201 (Criado)
        res.status(201).json(newOrder);
    } catch (error) {
        console.log("Error creating order:", error);
        // Responde com código de status 500 (Erro interno do servidor) e detalhes do erro
        res.status(500).json({ message: "Error creating order", error });
    }
};

// Função para obter todos os pedidos
export const getAllOrders = async (req, res) => {
    try {
        // Busca todos os pedidos no banco de dados
        const orders = await OrderModel.findAll();
        // Responde com a lista de pedidos e código de status 200 (OK)
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        // Responde com código de status 500 (Erro interno do servidor) e detalhes do erro
        res.status(500).json({ message: "Error fetching orders", error });
    }
};

// Função para obter um pedido pelo ID
export const getOrderById = async (req, res) => {
    // Extrai o ID do pedido dos parâmetros da requisição
    const { id } = req.params;

    try {
        // Busca o pedido pelo ID e inclui os modelos relacionados de Usuário e Prato
        const order = await OrderModel.findByPk(id, {
            include: [UserModel, DishModel]
        });

        // Verifica se o pedido foi encontrado
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        // Responde com o pedido encontrado e código de status 200 (OK)
        res.status(200).json(order);
    } catch (error) {
        console.error("Error retrieving order:", error);
        // Responde com código de status 500 (Erro interno do servidor) e detalhes do erro
        res.status(500).json({ error: 'Failed to retrieve order' });
    }
};

// Função para atualizar um pedido existente
export const updateOrder = async (req, res) => {
    // Extrai o ID do pedido dos parâmetros da requisição
    const { id } = req.params;

    try {
        // Extrai os campos do corpo da requisição
        const { nomeDoCliente, valorTotalPedido, idUsuario, idPrato } = req.body;

        // Busca o pedido pelo ID
        const order = await OrderModel.findByPk(id);

        // Verifica se o pedido foi encontrado
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Atualiza os campos do pedido
        order.nomeDoCliente = nomeDoCliente;
        order.valorTotalPedido = valorTotalPedido;
        order.idUsuario = idUsuario;
        order.idPrato = idPrato;

        // Salva as alterações no banco de dados
        await order.save();

        // Responde com o pedido atualizado e código de status 200 (OK)
        res.status(200).json(order);
    } catch (error) {
        console.error("Error updating order:", error);
        // Responde com código de status 500 (Erro interno do servidor) e detalhes do erro
        res.status(500).json({ error: 'Failed to update order' });
    }
};

// Função para deletar um pedido existente
export const deleteOrder = async (req, res) => {
    // Extrai o ID do pedido dos parâmetros da requisição
    const { id } = req.params;

    try {
        // Busca o pedido pelo ID
        const order = await OrderModel.findByPk(id);

        // Verifica se o pedido foi encontrado
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Deleta o pedido do banco de dados
        await order.destroy();

        // Responde com código de status 204 (Sem conteúdo) para indicar sucesso na exclusão
        res.status(204).end();
    } catch (error) {
        console.error("Error deleting order:", error);
        // Responde com código de status 500 (Erro interno do servidor) e detalhes do erro
        res.status(500).json({ error: 'Failed to delete order' });
    }
};
