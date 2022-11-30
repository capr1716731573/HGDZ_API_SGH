
const express= require('express');
const authenticationJWT = require('../middlewares/authentication');
const {
    getAllNivEdu,
    getNivEdu,
    createNivEdu,
    updateNivEdu,
    deleteNivEdu,
    getBsqNivEdu
}=require("../controllers/nivedu.controller");


const router = express.Router();

// Routes
router.get("/", authenticationJWT.verificarToken,getAllNivEdu);
router.get("/bsq/:bsq", authenticationJWT.verificarToken,getBsqNivEdu);
router.get("/:id", authenticationJWT.verificarToken,getNivEdu);
router.post("/i", authenticationJWT.verificarToken,createNivEdu);
router.post("/u", authenticationJWT.verificarToken,updateNivEdu);
router.post("/d", authenticationJWT.verificarToken,deleteNivEdu);

module.exports=router;
