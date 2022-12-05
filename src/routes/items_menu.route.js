
const express= require('express');
const authenticationJWT = require('../middlewares/authentication');
const {
    getAllItemsMenu,
    getBsqItemsMenu,
    getItemsMenu,
    createItemsMenu,
    updateItemsMenu,
    deleteItemsMenu
}=require("../controllers/items_menu.controller");


const router = express.Router();

// Routes
router.get("/", authenticationJWT.verificarToken,getAllItemsMenu);
router.get("/bsq/:bsq", authenticationJWT.verificarToken,getBsqItemsMenu);
router.get("/:id", authenticationJWT.verificarToken,getItemsMenu);
router.post("/i", authenticationJWT.verificarToken,createItemsMenu);
router.post("/u", authenticationJWT.verificarToken,updateItemsMenu);
router.post("/d", authenticationJWT.verificarToken,deleteItemsMenu);

module.exports=router;
