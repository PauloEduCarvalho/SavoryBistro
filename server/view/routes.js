import express from "express";

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



// Exporta o roteador para ser utilizado em outros arquivos
export default router;
