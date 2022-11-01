
const express= require('express');
var authenticationJWT = require('../middlewares/authentication');
const {
    getGeografiasXPadre,
    getAllXPais,
    getBusqueda,
    getGeografiaID,
    getGeografiaTipo,
    crudGeografia
}=require("../controllers/geografia.controller");


const router = express.Router();

// Routes
router.get("/padre/:fk_padre", authenticationJWT.verificarToken,getGeografiasXPadre);
router.get("/all/:pais", authenticationJWT.verificarToken,getAllXPais);
router.get("/bsq/:valor/:fk_padre", authenticationJWT.verificarToken,getBusqueda);
router.get("/id/:id", authenticationJWT.verificarToken,getGeografiaID);
router.get("/tipo/:tipo/:id", authenticationJWT.verificarToken,getGeografiaTipo);
router.post("/:accion", authenticationJWT.verificarToken,crudGeografia);

module.exports=router;
