const express = require('express');
const router = express.Router();
//importar express validator
const { body }= require('express-validator/check');

//importar el controlador
const proyectoController = require('../controllers/proyectoController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');

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

    // Eliminar Proyecto
    router.delete('/proyectos/:url', proyectoController.eliminarProyecto);

    // Tareas
    router.post('/proyectos/:url', tareasController.agregarTarea);

    // Actualizar Tarea
    router.patch('/tareas/:id', tareasController.cambiarEstadoTarea);

    // Actualizar Tarea
    router.delete('/tareas/:id', tareasController.eliminarTarea);

    // Crear nueva cuenta
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);
    router.post('/crear-cuenta', usuariosController.crearCuenta);
    router.get('/confirmar/:correo', usuariosController.confirmarCuenta);

    return router;
}