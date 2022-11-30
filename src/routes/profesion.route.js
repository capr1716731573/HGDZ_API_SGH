
const express= require('express');
const authenticationJWT = require('../middlewares/authentication');
const {
    getProfesiones,
    getBsqProfesiones,
    getProfesion,
    createProfesion,
    updateProfesion,
    deleteProfesion
}=require("../controllers/profesion.controller");


const router = express.Router();

// Routes
router.get("/", authenticationJWT.verificarToken,getProfesiones);
router.get("/bsq/:bsq", authenticationJWT.verificarToken,getBsqProfesiones);
router.get("/:id", authenticationJWT.verificarToken,getProfesion);
router.post("/i", authenticationJWT.verificarToken,createProfesion);
router.post("/u", authenticationJWT.verificarToken,updateProfesion);
router.post("/d", authenticationJWT.verificarToken,deleteProfesion);

module.exports=router;
