
const express= require('express');
const authenticationJWT = require('../../middlewares/authentication');
const {
    getBsqMenuPerfilUsuario
}=require("../../controllers/administracion/menu.controller");


const router = express.Router();

// Routes
//Menu
router.get("/by_user_perfil/:u/:p", authenticationJWT.verificarToken,getBsqMenuPerfilUsuario);

module.exports=router;
