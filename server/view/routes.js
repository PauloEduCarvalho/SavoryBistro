import express from "express";

// Importa as funções dos controladores para cada entidade<<<<<<< testeProjetoReact
import { createUser, getAllUsers, getUserById, getUserByEmail, updateUser, deleteUser } from "../controller/userController.js";
import { createDishController, getAllDishesController, getDishByIdController, updateDishController, deleteDishController } from '../controller/dishController.js';
import { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } from '../controller/orderController.js';


// Cria uma instância do roteador do Express
const router = express.Router();

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

// Rota para buscar usuário pelo nome
router.get("/users/login/:email", getUserByEmail);

// Rotas para pratos

// Rota para criar um novo prato
router.post('/dishes', createDishController);

// Rota para listar todos os pratos
router.get('/dishes', getAllDishesController);

// Rota para consultar um prato pelo ID
router.get('/dishes/:id', getDishByIdController);

// Rota para atualizar um prato pelo ID
router.put('/dishes/:id', updateDishController);

// Rota para excluir um prato pelo ID
router.delete('/dishes/:id', deleteDishController);

// Rotas para pedidos

// Rota para criar um novo pedido
router.post('/orders', createOrder);

// Rota para listar todos os pedidos
router.get('/orders', getAllOrders);

// Rota para consultar um pedido pelo ID
router.get('/orders/:id', getOrderById);

// Rota para atualizar um pedido pelo ID
router.put('/orders/:id', updateOrder);

// Rota para excluir um pedido pelo ID
router.delete('/orders/:id', deleteOrder);

// Exporta o roteador para ser utilizado em outros arquivos
export default router;
