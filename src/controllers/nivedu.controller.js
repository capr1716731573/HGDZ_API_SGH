const {sequelize} = require('../config/database');
require('dotenv').config();

const variablesEntorno=process.env;

const getAllNivEdu= async (req, res) => {
      try {
        let desde = req.query.desde;
        desde = Number(desde);
        let consulta='';
        if (req.query.desde) {
            consulta=`select * from nivel_educacion ne order by nombre_nivedu ASC  LIMIT ${ variablesEntorno.ROWS_X_PAGE } OFFSET ${ desde }`;
        } else {
            consulta=`select * from nivel_educacion ne order by nombre_nivedu  ASC`;
        }
        const [results,metadata] = await sequelize.query(consulta);
        console.log()
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

const getBsqNivEdu= async (req, res) => {
    try {
      let busqueda = req.params.bsq;
      const consulta=`select * from nivel_educacion ne  WHERE nombre_nivedu LIKE '%${busqueda}%'`;
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

const getNivEdu= async (req, res) => {
    try {
        const { id } = req.params;
        const consulta=`select * from nivel_educacion ne where pk_nivedu=${id}`;
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

const createNivEdu= async (req, res)=>{
    try {
        const body_json  = req.body;

        const consulta=`select * from sp_crud_nivel_educacion ('I','${JSON.stringify(body_json)}'::json)`;
        const [results] = await sequelize.query(consulta);

        res.status(200).json(results[0].mensaje); 
        
    } catch (error) {
        return res.status(500).json({ 
            status:'error',
            message: error.message 
        });
    }
}

const updateNivEdu= async (req, res)=>{
    try {
        const body_json  = req.body;

        const consulta=`select * from sp_crud_nivel_educacion ('U','${JSON.stringify(body_json)}'::json)`;
        const [results] = await sequelize.query(consulta);

        res.status(200).json(results[0].mensaje); 
        
    } catch (error) {
        return res.status(500).json({ 
            status:'error',
            message: error.message 
        });
    }
}

const deleteNivEdu= async (req, res)=>{
    try {
        const body_json  = req.body;

        const consulta=`select * from sp_crud_nivel_educacion ('D','${JSON.stringify(body_json)}'::json)`;
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
    getAllNivEdu,
    getBsqNivEdu,
    getNivEdu,
    createNivEdu,
    updateNivEdu,
    deleteNivEdu
}