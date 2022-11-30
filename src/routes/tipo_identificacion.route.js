
const express= require('express');
const authenticationJWT = require('../middlewares/authentication');
const {
    getAllTipIden,
    getBsqTipIden,
    getTipIden,
    createTipIden,
    updateTipIden,
    deleteTipIden
}=require("../controllers/tipiden.controller");


const router = express.Router();

// Routes
router.get("/", authenticationJWT.verificarToken,getAllTipIden);
router.get("/bsq/:bsq", authenticationJWT.verificarToken,getBsqTipIden);
router.get("/:id", authenticationJWT.verificarToken,getTipIden);
router.post("/i", authenticationJWT.verificarToken,createTipIden);
router.post("/u", authenticationJWT.verificarToken,updateTipIden);
router.post("/d", authenticationJWT.verificarToken,deleteTipIden);

module.exports=router;
