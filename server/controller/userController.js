import {
    createUserService,
    getAllUsersService,
    getUserByIdService,
    updateUserService,
    deleteUserService
} from '../service/userService.js';

export const createUser = async (req, res) => {
    const { nomeUsuario, email, senha, funcao, cpf, contato, endereco } = req.body;

    if (!nomeUsuario || !email || !senha || !funcao || !cpf || !contato || !endereco) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const newUser = await createUserService({
            nomeUsuario,
            email,
            senha,
            funcao,
            cpf,
            contato,
            endereco
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Error creating user", error });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsersService();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Error fetching users", error });
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await getUserByIdService(id);
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

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nomeUsuario, email, senha, funcao, cpf, contato, endereco } = req.body;

    try {
        const updatedUser = await updateUserService(id, {
            nomeUsuario,
            email,
            senha,
            funcao,
            cpf,
            contato,
            endereco
        });
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Error updating user", error });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const success = await deleteUserService(id);
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Error deleting user", error });
    }
};
