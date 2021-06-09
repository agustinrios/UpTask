const expess = require('express');
const router = expess.Router();
//importar express validator
const { body }= require('express-validator/check');

//importar el controlador
const proyectoController = require('../controllers/proyectoController');

module.exports = function() {
    //ruta para el home
    router.get('/', proyectoController.proyectoHome);
    router.get('/nuevo-proyecto', proyectoController.formularioProyecto);
    router.post('/nuevo-proyecto', 
        body('nombre').not().isEmpty().trim().escape(),
        proyectoController.nuevoProyecto
    );

    //listar proyectos
    router.get('/proyectos/:url', proyectoController.proyectoPorUrl);

    //actualizar el proyecto
    router.get('/proyecto/editar/:id', proyectoController.formularioEditar);
    router.post('/nuevo-proyecto/:id', 
        body('nombre').not().isEmpty().trim().escape(),
        proyectoController.actualizarProyecto
    );

    return router;
}