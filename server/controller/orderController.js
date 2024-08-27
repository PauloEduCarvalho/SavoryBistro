import {
    createOrderService,
    getAllOrdersService,
    getOrderByIdService,
    updateOrderService,
    deleteOrderService
} from '../service/orderService.js';

export const createOrder = async (req, res) => {
    const { nomeDoCliente, valorTotalPedido, idUsuario, idPrato } = req.body;

    if (!nomeDoCliente || !valorTotalPedido || !idUsuario || !idPrato) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const newOrder = await createOrderService({
            nomeDoCliente,
            valorTotalPedido,
            idUsuario,
            idPrato
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
    const { nomeDoCliente, valorTotalPedido, idUsuario, idPrato } = req.body;

    try {
        const updatedOrder = await updateOrderService(id, {
            nomeDoCliente,
            valorTotalPedido,
            idUsuario,
            idPrato
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
