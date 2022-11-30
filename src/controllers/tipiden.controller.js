const {sequelize} = require('../config/database');
require('dotenv').config();

const variablesEntorno=process.env;

const getAllTipIden= async (req, res) => {
    try {
        let desde = req.query.desde;
        desde = Number(desde);
        let consulta='';
        if (req.query.desde) {
            consulta=`select * from tipo_identificacion order by nombre_tipiden ASC  LIMIT ${ variablesEntorno.ROWS_X_PAGE } OFFSET ${ desde }`;
        } else {
            consulta=`select * from tipo_identificacion order by nombre_tipiden  ASC`;
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

const getBsqTipIden= async (req, res) => {
    try {
      let busqueda = req.params.bsq;
      const consulta=`select * from tipo_identificacion WHERE nombre_tipiden LIKE '%${busqueda}%'`;
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

const getTipIden= async (req, res) => {
    try {
        const { id } = req.params;
        const consulta=`select * from tipo_identificacion ne where pk_tipiden=${id}`;
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

const createTipIden= async (req, res)=>{
    try {
        const body_json  = req.body;

        const consulta=`select * from sp_crud_tipo_identificacion ('I','${JSON.stringify(body_json)}'::json)`;
        const [results] = await sequelize.query(consulta);

        res.status(200).json(results[0].mensaje); 
        
    } catch (error) {
        return res.status(500).json({ 
            status:'error',
            message: error.message 
        });
    }
}

const updateTipIden= async (req, res)=>{
    try {
        const body_json  = req.body;

        const consulta=`select * from sp_crud_tipo_identificacion ('U','${JSON.stringify(body_json)}'::json)`;
        const [results] = await sequelize.query(consulta);

        res.status(200).json(results[0].mensaje); 
        
    } catch (error) {
        return res.status(500).json({ 
            status:'error',
            message: error.message 
        });
    }
}

const deleteTipIden= async (req, res)=>{
    try {
        const body_json  = req.body;

        const consulta=`select * from sp_crud_tipo_identificacion ('D','${JSON.stringify(body_json)}'::json)`;
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
    getAllTipIden,
    getTipIden,
    getBsqTipIden,
    createTipIden,
    updateTipIden,
    deleteTipIden
}