const {sequelize} = require('../config/database');
require('dotenv').config();

const variablesEntorno=process.env;

const getAllPerfil= async (req, res) => {
    try {
        let desde = req.query.desde;
        desde = Number(desde);
        let consulta='';
        if (req.query.desde) {
            consulta=`select * from perfil order by nombre_perfil ASC  LIMIT ${ variablesEntorno.ROWS_X_PAGE } OFFSET ${ desde }`;
        } else {
            consulta=`select * from perfil order by nombre_perfil  ASC`;
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

const getBsqPerfil= async (req, res) => {
    try {
        let busqueda = req.params.bsq;
        const consulta=`select * from perfil WHERE nombre_perfil LIKE '%${busqueda}%'`;
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

const getPerfil= async (req, res) => {
    try {
        const { id } = req.params;
        const consulta=`select * from perfil where pk_perfil=${id}`;
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

const createPerfil= async (req, res)=>{
    try {
        const body_json  = req.body;

        const consulta=`select * from sp_crud_perfil ('I','${JSON.stringify(body_json)}'::json)`;
        const [results] = await sequelize.query(consulta);

        res.status(200).json(results[0].mensaje); 
        
    } catch (error) {
        return res.status(500).json({ 
            status:'error',
            message: error.message 
        });
    }
}

const updatePerfil= async (req, res)=>{
    try {
        const body_json  = req.body;

        const consulta=`select * from sp_crud_perfil ('U','${JSON.stringify(body_json)}'::json)`;
        const [results] = await sequelize.query(consulta);

        res.status(200).json(results[0].mensaje); 
        
    } catch (error) {
        return res.status(500).json({ 
            status:'error',
            message: error.message 
        });
    }
}

const deletePerfil= async (req, res)=>{
    try {
        const body_json  = req.body;

        const consulta=`select * from sp_crud_perfil ('D','${JSON.stringify(body_json)}'::json)`;
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
    getAllPerfil,
    getBsqPerfil,
    getPerfil,
    createPerfil,
    updatePerfil,
    deletePerfil
}