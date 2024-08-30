// server/__tests__/orderController.test.js

import { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } from '../controller/orderController.js';
import * as orderService from '../service/orderService.js';

jest.mock('../service/orderService.js');

describe('Order Controller Tests', () => {
    it('should create an order successfully', async () => {
        const req = { body: { nomeDoUsuario: 'John', valorTotalPedido: 50, idUsuario: 1, idPrato: 2 } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        orderService.createOrderService.mockResolvedValue(req.body);

        await createOrder(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(req.body);
    });

    it('should return all orders', async () => {
        const req = {};
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        orderService.getAllOrdersService.mockResolvedValue([{ nomeDoUsuario: 'John' }]);

        await getAllOrders(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ nomeDoUsuario: 'John' }]);
    });

    it('should return an order by ID', async () => {
        const req = { params: { id: '1' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        orderService.getOrderByIdService.mockResolvedValue({ nomeDoUsuario: 'John' });

        await getOrderById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ nomeDoUsuario: 'John' });
    });

    it('should update an order', async () => {
        const req = { params: { id: '1' }, body: { nomeDoUsuario: 'Updated John' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        orderService.updateOrderService.mockResolvedValue({ nomeDoUsuario: 'Updated John' });

        await updateOrder(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ nomeDoUsuario: 'Updated John' });
    });

    it('should delete an order', async () => {
        const req = { params: { id: '1' } };
        const res = { status: jest.fn().mockReturnThis(), end: jest.fn() };

        orderService.deleteOrderService.mockResolvedValue(true);

        await deleteOrder(req, res);

        expect(res.status).toHaveBeenCalledWith(204);
    });
});
