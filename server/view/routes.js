import express from "express";

import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from "../controller/userController.js";

// Importa as funções dos controladores para cada entidade
import { createDish, getAllDishes, getDishById, updateDish, deleteDish } from '../controller/dishController.js';

// Rotas para pratos

// Rota para criar um novo prato
router.post('/dishes', createDish);

// Rota para listar todos os pratos
router.get('/dishes', getAllDishes);

// Rota para consultar um prato pelo ID
router.get('/dishes/:id', getDishById);

// Rota para atualizar um prato pelo ID
router.put('/dishes/:id', updateDish);

// Rota para excluir um prato pelo ID
router.delete('/dishes/:id', deleteDish);

// Rotas para usuários

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


// Exporta o roteador para ser utilizado em outros arquivos
export default router;
