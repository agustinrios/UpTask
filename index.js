const express = require('express');
const routes = require('./routes');
const path = require('path');
const expressValidator = require('express-validator');

//helpers con algunas funciones
const helpers = require('./helpers');

//Crear la conexion a la base de datos
const db = require('./config/db');

//importar el modelo
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

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

// Agregamos express validator a toda la aplicación
app.use(expressValidator());



// Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));



app.use(cookieParser());

// sessiones nos permiten navegar entre distintas paginas sin volvernos a autenticar
app.use(session({ 
    secret: "keyboard cat", 
    resave: false, 
    saveUninitialized: false 
}));


app.use(passport.initialize());
app.use(passport.session());

// agregar flash messages
app.use(flash());

// Pasar var dump a la aplicación
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user} || null;
    next();
});


app.use('/', routes() );

app.listen(3000);