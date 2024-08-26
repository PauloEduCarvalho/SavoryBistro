import { DishModel } from '../postgres/postgres.js';

// Função para criar um novo prato no banco de dados
export const createDish = async (dishData) => {
    return await DishModel.create(dishData);
};

// Função para buscar todos os pratos no banco de dados
export const getAllDishes = async () => {
    return await DishModel.findAll();
};

// Função para buscar um prato pelo ID no banco de dados
export const getDishById = async (id) => {
    return await DishModel.findByPk(id);
};

// Função para atualizar um prato no banco de dados
export const updateDish = async (id, updatedData) => {
    const dish = await DishModel.findByPk(id);
    if (dish) {
        Object.assign(dish, updatedData);
        await dish.save();
        return dish;
    }
    return null;
};

// Função para excluir um prato pelo ID no banco de dados
export const deleteDish = async (id) => {
    const dish = await DishModel.findByPk(id);
    if (dish) {
        await dish.destroy();
        return true;
    }
    return false;
};
