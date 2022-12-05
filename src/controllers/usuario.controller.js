const {sequelize} = require('../config/database');
const bcryptjs = require('bcryptjs');
require('dotenv').config();

const variablesEntorno=process.env;

const getAllUsuario= async (req, res) => {
    try {
        let desde = req.query.desde;
        desde = Number(desde);
        let consulta='';
        //valido que exista el parametro "desde"
        if (req.query.desde) {
            consulta = `SELECT * FROM usuario usu INNER JOIN persona p on usu.pk_person = p.pk_person ORDER BY p.apellidos_person ASC, p.nombres_person ASC LIMIT ${ variablesEntorno.ROWS_X_PAGE } OFFSET ${ desde }`;
        } else {
            consulta = `SELECT * FROM usuario usu INNER JOIN persona p on usu.pk_person = p.pk_person ORDER BY p.apellidos_person ASC, p.nombres_person ASC`;
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
        const consulta = `SELECT * FROM usuario usu INNER JOIN persona p on usu.pk_person = p.pk_person 
            WHERE usu.usuario_user LIKE '%${busqueda}%' OR p.apellidos_person LIKE '%${busqueda}%' OR 
            p.nombres_person LIKE '%${busqueda}%' OR p.numidentificacion_person LIKE '%${busqueda}%'`;
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
        const consulta = `SELECT * FROM usuario usu INNER JOIN persona p on usu.pk_person = p.pk_person WHERE pk_user = ${ id }`;
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
        console.log(body_json.password_user);
        body_json.password_user = bcryptjs.hashSync(body_json.password_user, 10);
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

        if (body_json.password_user != body_json.password2) {
            body_json.password_user = bcryptjs.hashSync(body_json.password_user, 10);
        }
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