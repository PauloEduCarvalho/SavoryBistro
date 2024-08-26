import { createDish, getAllDishes, getDishById, updateDish, deleteDish } from '../service/dishService.js';

export const createDishController = async (req, res) => {
    const { nome, valorPrato, custoProducao } = req.body;

    if (!nome || valorPrato == null || custoProducao == null) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const newDish = await createDish({ nome, valorPrato, custoProducao });
        res.status(201).json(newDish);
    } catch (error) {
        console.error("Error creating dish:", error);
        res.status(500).json({ message: "Error creating dish", error });
    }
};

export const getAllDishesController = async (req, res) => {
    try {
        const dishes = await getAllDishes();
        res.status(200).json(dishes);
    } catch (error) {
        console.error("Error fetching dishes:", error);
        res.status(500).json({ message: "Error fetching dishes", error });
    }
};

export const getDishByIdController = async (req, res) => {
    const { id } = req.params;

    try {
        const dish = await getDishById(id);
        if (dish) {
            res.status(200).json(dish);
        } else {
            res.status(404).json({ message: "Dish not found" });
        }
    } catch (error) {
        console.error("Error fetching dish:", error);
        res.status(500).json({ message: "Error fetching dish", error });
    }
};

export const updateDishController = async (req, res) => {
    const { id } = req.params;
    const { nome, valorPrato, custoProducao } = req.body;

    try {
        const updatedDish = await updateDish(id, { nome, valorPrato, custoProducao });
        if (updatedDish) {
            res.status(200).json(updatedDish);
        } else {
            res.status(404).json({ message: "Dish not found" });
        }
    } catch (error) {
        console.error("Error updating dish:", error);
        res.status(500).json({ message: "Error updating dish", error });
    }
};

export const deleteDishController = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await deleteDish(id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Dish not found" });
        }
    } catch (error) {
        console.error("Error deleting dish:", error);
        res.status(500).json({ message: "Error deleting dish", error });
    }
};
