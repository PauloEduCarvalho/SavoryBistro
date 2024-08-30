import {
    createOrderService,
    getAllOrdersService,
    getOrderByIdService,
    updateOrderService,
    deleteOrderService
} from '../service/orderService.js';

export const createOrder = async (req, res) => {
    const { nomeDoUsuario, valorTotalPedido, idUsuario, pratos } = req.body;

    // Verifica se todos os campos obrigatórios estão presentes
    if (!nomeDoUsuario || !valorTotalPedido || !idUsuario || !pratos || pratos.length === 0) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        // Cria o pedido e associa os pratos
        const newOrder = await createOrderService({
            nomeDoUsuario,
            valorTotalPedido,
            idUsuario,
            pratos
        });
        res.status(201).json(newOrder);
    } catch (error) {
        console.log("Error creating order:", error);
        res.status(500).json({ message: "Error creating order", error });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await getAllOrdersService();
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Error fetching orders", error });
    }
};

export const getOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await getOrderByIdService(id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error("Error retrieving order:", error);
        res.status(500).json({ error: 'Failed to retrieve order' });
    }
};

export const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { nomeDoUsuario, valorTotalPedido, idUsuario, pratos } = req.body;

    try {
        const updatedOrder = await updateOrderService(id, {
            nomeDoUsuario,
            valorTotalPedido,
            idUsuario,
            pratos
        });
        if (updatedOrder) {
            res.status(200).json(updatedOrder);
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ error: 'Failed to update order' });
    }
};

export const deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const success = await deleteOrderService(id);
        if (success) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ error: 'Failed to delete order' });
    }
};
