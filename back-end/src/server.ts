import express from 'express';
import cors from 'cors';       // outros aplicações podem utilizar a API
import 'express-async-errors';
import errorHandler from './errors/handler';
import routes from './routes';
import './database/connection';
import path from 'path';

const app = express();

// Ativando o cors
app.use(cors());

// Utilizando json para construir uma API
app.use(express.json());

// Utilizando as rotas 
app.use(routes);

// Permitindo o acesso as imagens
app.use('/uploads', express.static(path.join(__dirname, '..','uploads')));
app.use(errorHandler);

app.listen(3333);

