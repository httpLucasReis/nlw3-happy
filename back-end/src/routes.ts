import { Router } from 'express';
import multer from 'multer';
import OrphanagesController from './controllers/OrphanagesController';
import uploadConfig from './config/upload'

// Api de rotas do node.
const routes = Router();
const upload = multer(uploadConfig)

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);

export default routes;


// Comentários

/* HTTP */

// Rota = conjunto 
// Recurso = usuario
// Método HTTP = GET, POST, PUT, DELETE.
// Parâmetros

// GET = BUSCAR UMA INFORMAÇÃO
// POST = CRIAR UMA INFORMAÇÃO
// PUT = EDITAR UMA INFORMAÇÃO
// DELETE = DELETAR UMA INFORMAÇÃO

// Query params: http://localhost:3000/users?search=diego&page=2 -> Parâmetros adicionais.
// Route params: http://localhost:3000/users/1 -> Identificar um recurso.
// Body: http://localhost:3000/ -> Corpo da requisão. Permitir enviar dados que não cabem no outros parâmetros. Informações compostas.

// : -> Indica um parâmetro.

/*  Banco de dados */

/* 
    Driver nativo: query normal
    sql.query("SELECT * FROM users")

    Query builder: query com javascript -> converter em uma query string.
    knex('users').select('*').where('name', 'Diego);

    ORM: Maior nível de abstração. Retorna uma instância de um objeto.
         Object Relational Mapping.

         // Users
         // Classe user

         // user1, user2, user3 -> os métodos irão alterar o banco de dados.


    // Criar um banco de dados 

    - migrations: Facilitam o desenvolvimento de uma banco de dados ( Coletividade )

*/ 


/* PADRÃO MVC

Models -> Dados.
Views  -> Como a informação irá ser exibida
Controllers -> Lógica das rotas.

*/