
const express= require('express');
const authenticationJWT = require('../middlewares/authentication');
const {
    getBsqMenuPerfil,
    getBsqMenuPerfilByUser,
    createMenuPerfil,
    updateMenuPerfil,
    deleteMenuPerfil
}=require("../controllers/menu_perfil.controller");


const router = express.Router();

// Routes
router.get("/perfil/:perfil", authenticationJWT.verificarToken,getBsqMenuPerfil);
router.get("/user/:user", authenticationJWT.verificarToken,getBsqMenuPerfilByUser);
router.post("/i", authenticationJWT.verificarToken,createMenuPerfil);
router.post("/u", authenticationJWT.verificarToken,updateMenuPerfil);
router.post("/d", authenticationJWT.verificarToken,deleteMenuPerfil);

module.exports=router;
