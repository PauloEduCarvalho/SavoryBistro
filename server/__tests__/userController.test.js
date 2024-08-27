// server/__tests__/userController.test.js

import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controller/userController.js';
import * as userService from '../service/userService.js';

jest.mock('../service/userService.js');

describe('User Controller Tests', () => {
    it('should create a user successfully', async () => {
        const req = { body: { nomeUsuario: 'John', email: 'john@example.com', senha: 'password', funcao: 'admin', cpf: '12345678900', contato: '123456789', endereco: 'Street 1' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        userService.createUserService.mockResolvedValue(req.body);

        await createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(req.body);
    });

    it('should return all users', async () => {
        const req = {};
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        userService.getAllUsersService.mockResolvedValue([{ nomeUsuario: 'John' }]);

        await getAllUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ nomeUsuario: 'John' }]);
    });

    it('should return a user by ID', async () => {
        const req = { params: { id: '1' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        userService.getUserByIdService.mockResolvedValue({ nomeUsuario: 'John' });

        await getUserById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ nomeUsuario: 'John' });
    });

    it('should update a user', async () => {
        const req = { params: { id: '1' }, body: { nomeUsuario: 'Updated John' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        userService.updateUserService.mockResolvedValue({ nomeUsuario: 'Updated John' });

        await updateUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ nomeUsuario: 'Updated John' });
    });

    it('should delete a user', async () => {
        const req = { params: { id: '1' } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        userService.deleteUserService.mockResolvedValue(true);

        await deleteUser(req, res);

        expect(res.status).toHaveBeenCalledWith(204);
    });
});
