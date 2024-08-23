    // controllers/dishController.js
    import { DishModel } from '../postgres/postgres.js';

    // Função para criar um novo prato
    export const createDish = async (req, res) => {
        const { nome, valorPrato, custoProducao } = req.body;

        if (!nome || valorPrato == null || custoProducao == null) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        try {
            const newDish = await DishModel.create({
                nome,
                valorPrato,
                custoProducao
            });
            res.status(201).json(newDish);
        } catch (error) {
            console.error("Error creating dish:", error);
            res.status(500).json({ message: "Error creating dish", error });
        }
    };

    // Função para listar todos os pratos
    export const getAllDishes = async (req, res) => {
        try {
            const dishes = await DishModel.findAll();
            res.status(200).json(dishes);
        } catch (error) {
            console.error("Error fetching dishes:", error);
            res.status(500).json({ message: "Error fetching dishes", error });
        }
    };

    // Função para consultar um prato pelo ID
    export const getDishById = async (req, res) => {
        const { id } = req.params;

        try {
            const dish = await DishModel.findByPk(id);

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

    // Função para atualizar um prato pelo ID
    export const updateDish = async (req, res) => {
        const { id } = req.params;
        const { nome, valorPrato, custoProducao } = req.body;

        try {
            const dish = await DishModel.findByPk(id);

            if (dish) {
                dish.nome = nome || dish.nome;
                dish.valorPrato = valorPrato || dish.valorPrato;
                dish.custoProducao = custoProducao || dish.custoProducao;

                await dish.save();
                res.status(200).json(dish);
            } else {
                res.status(404).json({ message: "Dish not found" });
            }
        } catch (error) {
            console.error("Error updating dish:", error);
            res.status(500).json({ message: "Error updating dish", error });
        }
    };

    // Função para excluir um prato pelo ID
    export const deleteDish = async (req, res) => {
        const { id } = req.params;

        try {
            const dish = await DishModel.findByPk(id);

            if (dish) {
                await dish.destroy();
                res.status(204).send(); // No content response
            } else {
                res.status(404).json({ message: "Dish not found" });
            }
        } catch (error) {
            console.error("Error deleting dish:", error);
            res.status(500).json({ message: "Error deleting dish", error });
        }
    };
