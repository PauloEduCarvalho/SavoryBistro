// Importa o modelo UserModel do módulo PostgreSQL
import { UserModel } from '../postgres/postgres.js';

// Função para criar um novo usuário
export const createUser = async (req, res) => {
    // Extrai os campos do corpo da requisição
    const { nomeUsuario, email, senha, funcao, cpf, contato, endereco } = req.body;

    console.log("Received data:", req.body);

    // Verifica se todos os campos obrigatórios estão presentes
    if (!nomeUsuario || !email || !senha || !funcao || !cpf || !contato || !endereco) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        // Cria um novo usuário no banco de dados
        const newUser = await UserModel.create({
            nomeUsuario,
            email,
            senha,
            funcao,
            cpf,
            contato,
            endereco
        });
        // Responde com o novo usuário criado e código de status 201 (Criado)
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        // Responde com código de status 500 (Erro interno do servidor) e detalhes do erro
        res.status(500).json({ message: "Error creating user", error });
    }
};

// Função para listar todos os usuários
export const getAllUsers = async (req, res) => {
    try {
        // Busca todos os usuários no banco de dados
        const users = await UserModel.findAll();
        // Responde com a lista de usuários e código de status 200 (OK)
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        // Responde com código de status 500 (Erro interno do servidor) e detalhes do erro
        res.status(500).json({ message: "Error fetching users", error });
    }
};

// Função para consultar um usuário pelo ID
export const getUserById = async (req, res) => {
    // Extrai o ID do usuário dos parâmetros da requisição
    const { id } = req.params;

    try {
        // Busca o usuário pelo ID
        const user = await UserModel.findByPk(id);

        // Verifica se o usuário foi encontrado
        if (user) {
            // Responde com o usuário encontrado e código de status 200 (OK)
            res.status(200).json(user);
        } else {
            // Responde com código de status 404 (Não encontrado) se o usuário não for encontrado
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        // Responde com código de status 500 (Erro interno do servidor) e detalhes do erro
        res.status(500).json({ message: "Error fetching user", error });
    }
};

// Função para atualizar um usuário pelo ID
export const updateUser = async (req, res) => {
    // Extrai o ID do usuário dos parâmetros da requisição
    const { id } = req.params;
    // Extrai os campos do corpo da requisição
    const { nomeUsuario, email, senha, funcao, cpf, contato, endereco } = req.body;

    try {
        // Busca o usuário pelo ID
        const user = await UserModel.findByPk(id);

        // Verifica se o usuário foi encontrado
        if (user) {
            // Atualiza os campos do usuário, preservando os valores atuais se novos não forem fornecidos
            user.nomeUsuario = nomeUsuario || user.nomeUsuario;
            user.email = email || user.email;
            user.senha = senha || user.senha;
            user.funcao = funcao || user.funcao;
            user.cpf = cpf || user.cpf;
            user.contato = contato || user.contato;
            user.endereco = endereco || user.endereco;

            // Salva as alterações no banco de dados
            await user.save();
            // Responde com o usuário atualizado e código de status 200 (OK)
            res.status(200).json(user);
        } else {
            // Responde com código de status 404 (Não encontrado) se o usuário não for encontrado
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error updating user:", error);
        // Responde com código de status 500 (Erro interno do servidor) e detalhes do erro
        res.status(500).json({ message: "Error updating user", error });
    }
};

// Função para excluir um usuário pelo ID
export const deleteUser = async (req, res) => {
    // Extrai o ID do usuário dos parâmetros da requisição
    const { id } = req.params;

    try {
        // Busca o usuário pelo ID
        const user = await UserModel.findByPk(id);

        // Verifica se o usuário foi encontrado
        if (user) {
            // Deleta o usuário do banco de dados
            await user.destroy();
            // Responde com código de status 204 (Sem conteúdo) para indicar sucesso na exclusão
            res.status(204).send();
        } else {
            // Responde com código de status 404 (Não encontrado) se o usuário não for encontrado
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        // Responde com código de status 500 (Erro interno do servidor) e detalhes do erro
        res.status(500).json({ message: "Error deleting user", error });
    }
};
