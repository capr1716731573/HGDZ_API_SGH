
const express= require('express');
const authenticationJWT = require('../../middlewares/authentication');
const {
    getAllTriaje,
    getTriajeById,
    createTriaje,
    updateTriaje,
    deleteTriaje
}=require("../../controllers/emergencia/triaje.controller");


const router = express.Router();

// Routes
router.get("/All/:desde/:bsq", authenticationJWT.verificarToken,getAllTriaje);
router.get("/ById/:id", authenticationJWT.verificarToken,getTriajeById);
router.get("/crud_c", authenticationJWT.verificarToken,createTriaje);
router.get("/crud_u", authenticationJWT.verificarToken,updateTriaje);
router.get("/crud_d", authenticationJWT.verificarToken,deleteTriaje);

module.exports=router;
