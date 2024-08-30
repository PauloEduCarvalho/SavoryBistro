import { createUserService, getAllUsersService, getUserByIdService, updateUserService, deleteUserService } from '../service/userService';
import { UserModel } from '../postgres/postgres';

jest.mock('../postgres/postgres', () => ({
    UserModel: {
        create: jest.fn(),
        findAll: jest.fn(),
        findByPk: jest.fn(),
    }
}));

describe('User Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should create a new user', async () => {
        const userData = { nomeUsuario: 'Jane', email: 'jane@example.com', senha: 'password123' };
        UserModel.create.mockResolvedValue(userData);

        const result = await createUserService(userData);

        expect(UserModel.create).toHaveBeenCalledWith(userData);
        expect(result).toEqual(userData);
    });

    test('should update an existing user', async () => {
        const userData = { nomeUsuario: 'Jane', email: 'jane@example.com', senha: 'password123' };
        UserModel.findByPk.mockResolvedValue({
            ...userData,
            update: jest.fn().mockResolvedValue({ ...userData, email: 'newemail@example.com' })
        });

        const result = await updateUserService(1, { email: 'newemail@example.com' });

        expect(UserModel.findByPk).toHaveBeenCalledWith(1);
        expect(result.email).toBe('newemail@example.com');
    });

    test('should delete a user by ID', async () => {
        UserModel.findByPk.mockResolvedValue({
            destroy: jest.fn().mockResolvedValue(true)
        });

        const result = await deleteUserService(1);

        expect(UserModel.findByPk).toHaveBeenCalledWith(1);
        expect(result).toBe(true);
    });
});
