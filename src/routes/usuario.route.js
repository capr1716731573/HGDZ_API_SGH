
const express= require('express');
const authenticationJWT = require('../middlewares/authentication');
const {
    getAllUsuario,
    getBsqUsuario,
    getUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario
}=require("../controllers/usuario.controller");


const router = express.Router();

// Routes
router.get("/", authenticationJWT.verificarToken,getAllUsuario,);
router.get("/bsq/:bsq", authenticationJWT.verificarToken,getBsqUsuario);
router.get("/:id", authenticationJWT.verificarToken,getUsuario,);
router.post("/i", authenticationJWT.verificarToken,createUsuario,);
router.post("/u", authenticationJWT.verificarToken,updateUsuario,);
router.post("/d", authenticationJWT.verificarToken,deleteUsuario);

module.exports=router;
