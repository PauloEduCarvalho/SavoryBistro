// server/__tests__/dishController.test.js

import { createDishController, getAllDishesController, getDishByIdController, updateDishController, deleteDishController } from '../controller/dishController.js';
import * as dishService from '../service/dishService.js';

jest.mock('../service/dishService.js');

describe('Dish Controller Tests', () => {
    it('should create a dish successfully', async () => {
        const req = { body: { nome: 'Pizza', valorPrato: 20, custoProducao: 10 } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        dishService.createDish.mockResolvedValue(req.body);

        await createDishController(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(req.body);
    });

    it('should return all dishes', async () => {
        const req = {};
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        dishService.getAllDishes.mockResolvedValue([{ nome: 'Pizza' }]);

        await getAllDishesController(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ nome: 'Pizza' }]);
    });

    it('should return a dish by ID', async () => {
        const req = { params: { id: '1' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        dishService.getDishById.mockResolvedValue({ nome: 'Pizza' });

        await getDishByIdController(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ nome: 'Pizza' });
    });

    it('should update a dish', async () => {
        const req = { params: { id: '1' }, body: { nome: 'Updated Pizza' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        dishService.updateDish.mockResolvedValue({ nome: 'Updated Pizza' });

        await updateDishController(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ nome: 'Updated Pizza' });
    });

    it('should delete a dish', async () => {
        const req = { params: { id: '1' } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        dishService.deleteDish.mockResolvedValue(true);

        await deleteDishController(req, res);

        expect(res.status).toHaveBeenCalledWith(204);
    });
});
