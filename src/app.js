const express = require('express');
const cors= require('cors');

//Import Routes
/* const login_route = require('./routes/login.route');
const profesion_route = require('./routes/profesion.route');
const geografia_route = require('./routes/geografia.route');
const nivel_educacion_route = require('./routes/nivel_educacion.route');
const tipo_identificacion_route = require('./routes/tipo_identificacion.route');
const usuario_route = require('./routes/usuario.route');
const perfil_route = require('./routes/perfil.route');
const items_menu_route = require('./routes/items_menu.route');
const menu_perfil_route = require('./routes/menu_perfil.route'); */

/******  ROUTES EMERGENCIA *********/
const menu_perfil_route = require('./routes/administracion/menu.route');
const triaje_route = require('./routes/emergencia/triaje.route');

const app=express();

//middleware CORS
app.use(cors());

//Lectura y Parseo del Body
app.use(express.json());

// Routes
app.use("/api/menu", menu_perfil_route);
app.use("/api/triaje", triaje_route);

module.exports={
    app
}