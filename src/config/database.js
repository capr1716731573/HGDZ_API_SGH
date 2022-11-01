//NO IMPORTAR ASI DA PROBLEMAS
//import Sequelize from "sequelize";
const Sequelize= require('sequelize');
require('dotenv').config();

const variablesEntorno=process.env;
const sequelize= new Sequelize(
    variablesEntorno.DB,
    variablesEntorno.USER,
    variablesEntorno.PASSWORD,    
    {
        host:variablesEntorno.HOST,
        dialect:"postgres"

    }
);

module.exports={
    sequelize
}