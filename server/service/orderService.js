import { OrderModel, UserModel, DishModel } from '../postgres/postgres.js';

export const createOrderService = async (orderData) => {
    return await OrderModel.create(orderData);
};

export const getAllOrdersService = async () => {
    return await OrderModel.findAll();
};

export const getOrderByIdService = async (id) => {
    return await OrderModel.findByPk(id, {
        include: [UserModel, DishModel]
    });
};

export const updateOrderService = async (id, updatedData) => {
    const order = await OrderModel.findByPk(id);
    if (order) {
        return await order.update(updatedData);
    }
    return null;
};

export const deleteOrderService = async (id) => {
    const order = await OrderModel.findByPk(id);
    if (order) {
        await order.destroy();
        return true;
    }
    return false;
};
