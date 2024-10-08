// server/index.js
import express from 'express';
import { connection } from './postgres/postgres.js';
import router from './view/routes.js';
import cors from 'cors';

const app = express();

app.use(cors()) // Para permitir que o frontend acesse o backend

app.use(express.json()); // Para permitir que o express entenda JSON
app.use(router);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

connection(); 
