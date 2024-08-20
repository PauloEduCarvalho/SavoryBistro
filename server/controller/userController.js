import { UserModel } from '../postgres/postgres.js';

// Função para criar um novo usuário
export const createUser = async (req, res) => {
    const { name, email, password, role} = req.body;

    console.log("Received data:", req.body);

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const newUser = await UserModel.create({
            name,
            email,
            password,
            role
         
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Error creating user", error });
    }
};


// Função para listar todos os usuários
export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Error fetching users", error });
    }
};

// Função para consultar um usuário pelo ID
export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await UserModel.findByPk(id);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Error fetching user", error });
    }
};

// Função para atualizar um usuário pelo ID
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role, userId } = req.body;

    try {
        const user = await UserModel.findByPk(id);

        if (user) {
            user.name = name || user.name;
            user.email = email || user.email;
            user.password = password || user.password;
            user.role = role || user.role;
            user.userId = userId || user.userId; // Atualize userId se fornecido

            await user.save();
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Error updating user", error });
    }
};

// Função para excluir um usuário pelo ID
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await UserModel.findByPk(id);

        if (user) {
            await user.destroy();
            res.status(204).send(); // No content response
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Error deleting user", error });
    }
};
