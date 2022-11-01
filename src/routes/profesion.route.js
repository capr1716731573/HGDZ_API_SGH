
const express= require('express');
const authenticationJWT = require('../middlewares/authentication');
const {
    getProfesiones,
    getProfesion,
    createProfesion,
    updateProfesion,
    deleteProfesion
}=require("../controllers/profesion.controller");


const router = express.Router();

// Routes
router.get("/", authenticationJWT.verificarToken,getProfesiones);
router.get("/:id", authenticationJWT.verificarToken,getProfesion);
router.post("/i", authenticationJWT.verificarToken,createProfesion);
router.post("/u", authenticationJWT.verificarToken,updateProfesion);
router.post("/d", authenticationJWT.verificarToken,deleteProfesion);

module.exports=router;
