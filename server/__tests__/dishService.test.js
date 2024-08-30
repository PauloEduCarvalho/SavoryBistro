import { createDish, getAllDishes, getDishById, updateDish, deleteDish } from '../service/dishService';
import { DishModel } from '../postgres/postgres';

jest.mock('../postgres/postgres', () => ({
    DishModel: {
        create: jest.fn(),
        findAll: jest.fn(),
        findByPk: jest.fn(),
    }
}));

describe('Dish Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should create a new dish', async () => {
        const dishData = { nome: 'Pizza', valorPrato: 30, custoProducao: 15 };
        DishModel.create.mockResolvedValue(dishData);

        const result = await createDish(dishData);

        expect(DishModel.create).toHaveBeenCalledWith(dishData);
        expect(result).toEqual(dishData);
    });

    test('should update an existing dish', async () => {
        const dishData = { nome: 'Pasta', valorPrato: 20, custoProducao: 10 };
        DishModel.findByPk.mockResolvedValue({
            ...dishData,
            save: jest.fn().mockResolvedValue(dishData)
        });

        const result = await updateDish(1, { valorPrato: 25 });

        expect(DishModel.findByPk).toHaveBeenCalledWith(1);
        expect(result.valorPrato).toBe(25);
    });

    test('should delete a dish by ID', async () => {
        DishModel.findByPk.mockResolvedValue({
            destroy: jest.fn().mockResolvedValue(true)
        });

        const result = await deleteDish(1);

        expect(DishModel.findByPk).toHaveBeenCalledWith(1);
        expect(result).toBe(true);
    });
});
