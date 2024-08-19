import express from 'express';
import { connection } from './postegres/postgres.js';

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

connection();