const expess = require('express');
const router = expess.Router();

//importar el controlador
const proyectoController = require('../controllers/proyectoController');

module.exports = function() {
    //ruta para el home
    router.get('/', proyectoController.proyectoHome);
    router.get('/nuevo-proyecto', proyectoController.formularioProyecto);
    router.post('/nuevo-proyecto', proyectoController.nuevoProyecto);
    return router;
}