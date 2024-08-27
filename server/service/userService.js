import { UserModel } from '../postgres/postgres.js';

export const createUserService = async (userData) => {
    return await UserModel.create(userData);
};

export const getAllUsersService = async () => {
    return await UserModel.findAll();
};

export const getUserByIdService = async (id) => {
    return await UserModel.findByPk(id);
};

export const updateUserService = async (id, updatedData) => {
    const user = await UserModel.findByPk(id);
    if (user) {
        return await user.update(updatedData);
    }
    return null;
};

export const deleteUserService = async (id) => {
    const user = await UserModel.findByPk(id);
    if (user) {
        await user.destroy();
        return true;
    }
    return false;
};
