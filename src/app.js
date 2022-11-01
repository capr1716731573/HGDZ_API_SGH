const express = require('express');
const cors= require('cors');

//Import Routes
const login_route = require('./routes/login.route');
const profesion_route = require('./routes/profesion.route');
const geografia_route = require('./routes/geografia.route');


const app=express();

//middleware CORS
app.use(cors());

//Lectura y Parseo del Body
app.use(express.json());

// Routes
app.use("/api/login", login_route);
app.use("/api/profesion", profesion_route);
app.use("/api/geografia", geografia_route);

module.exports={
    app
}