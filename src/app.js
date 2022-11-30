const express = require('express');
const cors= require('cors');

//Import Routes
const login_route = require('./routes/login.route');
const profesion_route = require('./routes/profesion.route');
const geografia_route = require('./routes/geografia.route');
const nivel_educacion_route = require('./routes/nivel_educacion.route');
const tipo_identificacion_route = require('./routes/tipo_identificacion.route');
const usuario_route = require('./routes/usuario.route');
const perfil_route = require('./routes/perfil.route');



const app=express();

//middleware CORS
app.use(cors());

//Lectura y Parseo del Body
app.use(express.json());

// Routes
app.use("/api/login", login_route);
app.use("/api/profesion", profesion_route);
app.use("/api/geografia", geografia_route);
app.use("/api/nivedu", nivel_educacion_route);
app.use("/api/tipiden", tipo_identificacion_route);
app.use("/api/perfil", perfil_route);
app.use("/api/usuario", usuario_route);

module.exports={
    app
}