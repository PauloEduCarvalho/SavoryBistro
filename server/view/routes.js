// server/view/routes.js

import express from "express";
import { createUser } from "../controller/userController.js";
const router = express.Router();

router.post("/users", createUser);

export default router;