const {sequelize} = require('../config/database');

const getProfesiones= async (req, res) => {
    try {
        const consulta=`select * from profesion p order by nombre_prof ASC`;
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

const getProfesion= async (req, res) => {
    try {
        const { id } = req.params;
        const consulta=`select * from profesion p where pk_prof=${id}`;
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

const createProfesion= async (req, res)=>{
    try {
        const body_json  = req.body;

        const consulta=`select * from sp_crud_profesion ('I','${JSON.stringify(body_json)}'::json)`;
        const [results] = await sequelize.query(consulta);

        res.status(200).json(results[0].mensaje); 
        
    } catch (error) {
        return res.status(500).json({ 
            status:'error',
            message: error.message 
        });
    }
}

const updateProfesion= async (req, res)=>{
    try {
        const body_json  = req.body;

        const consulta=`select * from sp_crud_profesion ('U','${JSON.stringify(body_json)}'::json)`;
        const [results] = await sequelize.query(consulta);

        res.status(200).json(results[0].mensaje); 
        
    } catch (error) {
        return res.status(500).json({ 
            status:'error',
            message: error.message 
        });
    }
}

const deleteProfesion= async (req, res)=>{
    try {
        const body_json  = req.body;

        const consulta=`select * from sp_crud_profesion ('D','${JSON.stringify(body_json)}'::json)`;
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
    getProfesiones,
    getProfesion,
    createProfesion,
    updateProfesion,
    deleteProfesion
}