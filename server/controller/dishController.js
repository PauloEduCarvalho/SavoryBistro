// Importa o modelo DishModel do módulo PostgreSQL
import { DishModel } from '../postgres/postgres.js';

// Função para criar um novo prato
export const createDish = async (req, res) => {
    // Extrai os campos do corpo da requisição
    const { nome, valorPrato, custoProducao } = req.body;

    // Verifica se todos os campos obrigatórios estão presentes
    if (!nome || valorPrato == null || custoProducao == null) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        // Cria um novo prato no banco de dados
        const newDish = await DishModel.create({
            nome,
            valorPrato,
            custoProducao
        });
        // Responde com o novo prato criado e código de status 201 (Criado)
        res.status(201).json(newDish);
    } catch (error) {
        console.error("Error creating dish:", error);
        // Responde com código de status 500 (Erro interno do servidor) e detalhes do erro
        res.status(500).json({ message: "Error creating dish", error });
    }
};

// Função para listar todos os pratos
export const getAllDishes = async (req, res) => {
    try {
        // Busca todos os pratos no banco de dados
        const dishes = await DishModel.findAll();
        // Responde com a lista de pratos e código de status 200 (OK)
        res.status(200).json(dishes);
    } catch (error) {
        console.error("Error fetching dishes:", error);
        // Responde com código de status 500 (Erro interno do servidor) e detalhes do erro
        res.status(500).json({ message: "Error fetching dishes", error });
    }
};

// Função para consultar um prato pelo ID
export const getDishById = async (req, res) => {
    // Extrai o ID do prato dos parâmetros da requisição
    const { id } = req.params;

    try {
        // Busca o prato pelo ID
        const dish = await DishModel.findByPk(id);

        // Verifica se o prato foi encontrado
        if (dish) {
            // Responde com o prato encontrado e código de status 200 (OK)
            res.status(200).json(dish);
        } else {
            // Responde com código de status 404 (Não encontrado) se o prato não for encontrado
            res.status(404).json({ message: "Dish not found" });
        }
    } catch (error) {
        console.error("Error fetching dish:", error);
        // Responde com código de status 500 (Erro interno do servidor) e detalhes do erro
        res.status(500).json({ message: "Error fetching dish", error });
    }
};

// Função para atualizar um prato pelo ID
export const updateDish = async (req, res) => {
    // Extrai o ID do prato dos parâmetros da requisição
    const { id } = req.params;
    // Extrai os campos do corpo da requisição
    const { nome, valorPrato, custoProducao } = req.body;

    try {
        // Busca o prato pelo ID
        const dish = await DishModel.findByPk(id);

        // Verifica se o prato foi encontrado
        if (dish) {
            // Atualiza os campos do prato, preservando os valores atuais se novos não forem fornecidos
            dish.nome = nome || dish.nome;
            dish.valorPrato = valorPrato || dish.valorPrato;
            dish.custoProducao = custoProducao || dish.custoProducao;

            // Salva as alterações no banco de dados
            await dish.save();
            // Responde com o prato atualizado e código de status 200 (OK)
            res.status(200).json(dish);
        } else {
            // Responde com código de status 404 (Não encontrado) se o prato não for encontrado
            res.status(404).json({ message: "Dish not found" });
        }
    } catch (error) {
        console.error("Error updating dish:", error);
        // Responde com código de status 500 (Erro interno do servidor) e detalhes do erro
        res.status(500).json({ message: "Error updating dish", error });
    }
};

// Função para excluir um prato pelo ID
export const deleteDish = async (req, res) => {
    // Extrai o ID do prato dos parâmetros da requisição
    const { id } = req.params;

    try {
        // Busca o prato pelo ID
        const dish = await DishModel.findByPk(id);

        // Verifica se o prato foi encontrado
        if (dish) {
            // Deleta o prato do banco de dados
            await dish.destroy();
            // Responde com código de status 204 (Sem conteúdo) para indicar sucesso na exclusão
            res.status(204).send();
        } else {
            // Responde com código de status 404 (Não encontrado) se o prato não for encontrado
            res.status(404).json({ message: "Dish not found" });
        }
    } catch (error) {
        console.error("Error deleting dish:", error);
        // Responde com código de status 500 (Erro interno do servidor) e detalhes do erro
        res.status(500).json({ message: "Error deleting dish", error });
    }
};
