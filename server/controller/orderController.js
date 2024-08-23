import { OrderModel, UserModel, DishModel } from '../postgres/postgres.js';


export const createOrder = async (req, res) => {
    const { nomeDoCliente, valorTotalPedido, idUsuario, idPrato } = req.body;
    console.log("Received data:", req.body);

    if (!nomeDoCliente || !valorTotalPedido || !idUsuario || !idPrato) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const newOrder = await OrderModel.create({
            nomeDoCliente,
            valorTotalPedido,
            idUser: idUsuario, // Certifique-se de que este é o nome correto do campo no modelo
            idPrato // Certifique-se de que este é o nome correto do campo no modelo
            // dataPedido será preenchido automaticamente
        });
        res.status(201).json(newOrder);
    } catch (error) {
        console.log("Error creating order:", error);
        res.status(500).json({ message: "Error creating order", error });
    }
};


export const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderModel.findAll();
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Error fetching orders", error });
    }
};

export const getOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await OrderModel.findByPk(id, {
            include: [UserModel, DishModel]
        });

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

    try {
        const { nomeDoCliente, valorTotalPedido, idUsuario, idPrato } = req.body;

        const order = await OrderModel.findByPk(id);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        order.nomeDoCliente = nomeDoCliente;
        order.valorTotalPedido = valorTotalPedido;
        order.idUser = idUsuario;
        order.idPrato = idPrato;

        await order.save();

        res.status(200).json(order);
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ error: 'Failed to update order' });
    }
};

export const deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await OrderModel.findByPk(id);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        await order.destroy();

        res.status(204).end();
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ error: 'Failed to delete order' });
    }
};
