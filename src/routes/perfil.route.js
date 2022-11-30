
const express= require('express');
const authenticationJWT = require('../middlewares/authentication');
const {
    getAllPerfil,
    getBsqPerfil,
    getPerfil,
    createPerfil,
    updatePerfil,
    deletePerfil
}=require("../controllers/perfil.controller");


const router = express.Router();

// Routes
router.get("/", authenticationJWT.verificarToken,getAllPerfil);
router.get("/bsq/:bsq", authenticationJWT.verificarToken,getBsqPerfil);
router.get("/:id", authenticationJWT.verificarToken,getPerfil);
router.post("/i", authenticationJWT.verificarToken,createPerfil);
router.post("/u", authenticationJWT.verificarToken,updatePerfil);
router.post("/d", authenticationJWT.verificarToken,deletePerfil);

module.exports=router;
