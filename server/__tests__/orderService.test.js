import { createOrderService, getAllOrdersService, getOrderByIdService, updateOrderService, deleteOrderService } from '../service/orderService';
import { OrderModel, DishModel } from '../postgres/postgres';

jest.mock('../postgres/postgres', () => ({
    OrderModel: {
        create: jest.fn(),
        findAll: jest.fn(),
        findByPk: jest.fn(),
    },
    DishModel: jest.fn()
}));

describe('Order Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should create a new order', async () => {
        const orderData = { nomeDoUsuario: 'John', valorTotalPedido: 100, idUsuario: 1, pratos: [1, 2] };
        const createdOrder = { ...orderData, id: 1, addDishes: jest.fn().mockResolvedValue(null) };
        OrderModel.create.mockResolvedValue(createdOrder);
        createdOrder.reload = jest.fn().mockResolvedValue(createdOrder);

        const result = await createOrderService(orderData);

        expect(OrderModel.create).toHaveBeenCalledWith(expect.objectContaining({
            nomeDoUsuario: 'John',
            valorTotalPedido: 100,
            idUsuario: 1
        }));
        expect(result).toEqual(createdOrder);
    });

    test('should update an existing order', async () => {
        const orderData = { nomeDoUsuario: 'John', valorTotalPedido: 100, idUsuario: 1 };
        OrderModel.findByPk.mockResolvedValue({
            ...orderData,
            update: jest.fn().mockResolvedValue({ ...orderData, valorTotalPedido: 120 })
        });

        const result = await updateOrderService(1, { valorTotalPedido: 120 });

        expect(OrderModel.findByPk).toHaveBeenCalledWith(1);
        expect(result.valorTotalPedido).toBe(120);
    });

    test('should delete an order by ID', async () => {
        OrderModel.findByPk.mockResolvedValue({
            destroy: jest.fn().mockResolvedValue(true)
        });

        const result = await deleteOrderService(1);

        expect(OrderModel.findByPk).toHaveBeenCalledWith(1);
        expect(result).toBe(true);
    });
});
