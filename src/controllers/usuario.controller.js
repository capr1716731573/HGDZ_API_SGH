const {sequelize} = require('../config/database');
require('dotenv').config();

const variablesEntorno=process.env;

const getAllUsuario= async (req, res) => {
    try {
        let desde = req.query.desde;
        desde = Number(desde);
        let consulta='';
        if (req.query.desde) {
            consulta=`select * from usuario  order by usuario_user  ASC  LIMIT ${ variablesEntorno.ROWS_X_PAGE } OFFSET ${ desde }`;
        } else {
            consulta=`select * from usuario  order by usuario_user  ASC`;
        }
        const [results,metadata] = await sequelize.query(consulta);

        res.status(200).json({
            status: 'ok',
            rows: results,
            count: metadata.rowCount
        }); 
        
    } catch (error) {
        return res.status(500).json({ 
            status:'error',
            message: error.message 
        });
    }
}

const getBsqUsuario= async (req, res) => {
    try {
        let busqueda = req.params.bsq;
        const consulta=`select * from usuario WHERE usuario_user LIKE '%${busqueda}%'`;
        const [results,metadata] = await sequelize.query(consulta);

        res.status(200).json({
            status: 'ok',
            rows: results,
            count: metadata.rowCount
        }); 
        
    } catch (error) {
        return res.status(500).json({ 
            status:'error',
            message: error.message 
        });
    }
}

const getUsuario= async (req, res) => {
    try {
        const { id } = req.params;
        const consulta=`select * from usuario where pk_user=${id}`;
        const [results,metadata] = await sequelize.query(consulta);

        res.status(200).json({
            status: 'ok',
            rows: results[0],
            count: metadata.rowCount
        }); 
        
    } catch (error) {
        return res.status(500).json({ 
            status:'error',
            message: error.message 
        });
    }
}

const createUsuario= async (req, res)=>{
    try {
        const body_json  = req.body;

        const consulta=`select * from sp_crud_usuario ('I','${JSON.stringify(body_json)}'::json)`;
        const [results] = await sequelize.query(consulta);

        res.status(200).json(results[0].mensaje); 
        
    } catch (error) {
        return res.status(500).json({ 
            status:'error',
            message: error.message 
        });
    }
}

const updateUsuario= async (req, res)=>{
    try {
        const body_json  = req.body;

        const consulta=`select * from sp_crud_usuario ('U','${JSON.stringify(body_json)}'::json)`;
        const [results] = await sequelize.query(consulta);

        res.status(200).json(results[0].mensaje); 
        
    } catch (error) {
        return res.status(500).json({ 
            status:'error',
            message: error.message 
        });
    }
}

const deleteUsuario= async (req, res)=>{
    try {
        const body_json  = req.body;

        const consulta=`select * from sp_crud_usuario ('D','${JSON.stringify(body_json)}'::json)`;
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
    getAllUsuario,
    getBsqUsuario,
    getUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario
}