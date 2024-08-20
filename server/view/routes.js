// server/view/routes.js

import express from "express";
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from "../controller/userController.js";

const router = express.Router();

// Rota para criar um novo usuário
router.post("/users", createUser);

// Rota para listar todos os usuários
router.get("/users", getAllUsers);

// Rota para consultar um usuário pelo ID
router.get("/users/:id", getUserById);

// Rota para atualizar um usuário pelo ID
router.put("/users/:id", updateUser);

// Rota para excluir um usuário pelo ID
router.delete("/users/:id", deleteUser);

export default router;
