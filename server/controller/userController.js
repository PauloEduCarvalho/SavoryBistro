// server/controller/userController.js

import { UserModel } from '../postgres/postgres.js';

export const createUser = async (req, res) => {
    const { name, email, password, role, empId } = req.body;

    try {
        const newUser = await UserModel.create({
            name,
            email,
            password,
            role,
            empId
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Error creating user", error });
    }
};
