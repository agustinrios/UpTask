const express = require('express');
const routes = require('./routes');
const path = require('path');
const expressvalidator = require('express-validator');

//helpers con algunas funciones
const helpers = require('./helpers');

//Crear la conexion a la base de datos
const db = require('./config/db');

//importar el modelo
require('./models/Proyectos');

db.sync()
    .then(() => console.log('conectado'))
    .catch(error => console.log(error));

//crear una app de expresss
const app = express();

//donde cargar los archivos estaticos
app.use(express.static('public'));

//habilitar pug
app.set('view engine', 'pug');
//añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

//pasar var dump
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    next();
});

//habilitar bodyParser para leer datos del formulario
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/', routes());

app.listen(3000);
