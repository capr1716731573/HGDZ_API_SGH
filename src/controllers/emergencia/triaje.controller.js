const {sequelize} = require('../../config/database');
require('dotenv').config();

const variablesEntorno=process.env;

//Retorna todo el triaje y con busqueda y paginacion desde funcion en la base de datos
const getAllTriaje= async (req, res) => {
      try {
        let desde = req.params.desde;
        let bsq = req.params.bsq; //Este dato debe ir en comillas simples en el API Link
        desde = Number(desde);
        let consulta=`select * from his_getAll_triaje(${ bsq },${ variablesEntorno.ROWS_X_PAGE },${ desde })`;
        
        const [results,metadata] = await sequelize.query(consulta);
        res.status(200).json(results[0].mensaje);
        
    } catch (error) {
        return res.status(500).json({ 
            status:'error',
            message: error.message 
        });
    }
}

const getTriajeById= async (req, res) => {
    try {
        const { id } = req.params;
        const consulta=`select * from his_getByID_triaje(${id})`;
        const [results,metadata] = await sequelize.query(consulta);

        res.status(200).json(results[0].mensaje);
        
    } catch (error) {
        return res.status(500).json({ 
            status:'error',
            message: error.message 
        });
    }
}

const createTriaje= async (req, res)=>{
    try {
        const body_json  = req.body;

        const consulta=`select * from his_crud_emergencia_triaje ('I','${JSON.stringify(body_json)}'::json)`;
        const [results] = await sequelize.query(consulta);

        res.status(200).json(results[0].mensaje); 
        
    } catch (error) {
        return res.status(500).json({ 
            status:'error',
            message: error.message 
        });
    }
}

const updateTriaje= async (req, res)=>{
    try {
        const body_json  = req.body;

        const consulta=`select * from his_crud_emergencia_triaje ('U','${JSON.stringify(body_json)}'::json)`;
        const [results] = await sequelize.query(consulta);

        res.status(200).json(results[0].mensaje); 
        
    } catch (error) {
        return res.status(500).json({ 
            status:'error',
            message: error.message 
        });
    }
}

const deleteTriaje= async (req, res)=>{
    try {
        const body_json  = req.body;

        const consulta=`select * from his_crud_emergencia_triaje ('D','${JSON.stringify(body_json)}'::json)`;
        const [results] = await sequelize.query(consulta);

        res.status(200).json(results[0].mensaje); 
        
    } catch (error) {
        return res.status(500).json({ 
            status:'error',
            message: error.message 
        });
    }
}

module.exports={
    getAllTriaje,
    getTriajeById,
    createTriaje,
    updateTriaje,
    deleteTriaje
}