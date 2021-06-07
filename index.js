const express = require('express');
const routes = require('./routes');
const path = require('path');

//Crear la conexion a la base de datos
const db = require('./config/db');

db.authenticate()
    .then(() => console.log('conectado'))
    .catch(error => console.log(error));

//crear una app de expresss
const app = express();

//donde cargar vlos archivos estaticos
app.use(express.static('public'));

//habilitar pug
app.set('view engine', 'pug');
//añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

//habilitar bodyParser para leer datos del formulario
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/', routes());

app.listen(3000);
