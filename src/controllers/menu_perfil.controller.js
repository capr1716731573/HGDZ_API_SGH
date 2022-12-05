const {sequelize} = require('../config/database');

const getBsqMenuPerfil= async (req, res)=>{
    try {
        let id = req.params.perfil;
        const consulta=`SELECT * FROM sp_getmenubyperfil(${ id })`;
        const [results,metadata] = await sequelize.query(consulta);
  
        res.status(200).json({
            status: 'ok',
            rows: results[0].mensaje,
            count: metadata.rowCount
        }); 
        
    } catch (error) {
        return res.status(500).json({ 
            status:'error',
            message: error.message 
        });
    }
}

const getBsqMenuPerfilByUser= async (req, res) => {
    try {
      let user = req.params.user;
      const consulta=`SELECT * FROM sp_getmenubyuser(${ user })`;
      const [results,metadata] = await sequelize.query(consulta);

      res.status(200).json({
          status: 'ok',
          rows: results[0].mensaje,
          count: metadata.rowCount
      }); 
      
  } catch (error) {
      return res.status(500).json({ 
          status:'error',
          message: error.message 
      });
  }
}

const createMenuPerfil= async (req, res)=>{
    try {
        const body_json  = req.body;

        const consulta=`select * from sp_crud_menu_perfil ('I','${JSON.stringify(body_json)}'::json)`;
        const [results] = await sequelize.query(consulta);

        res.status(200).json(results[0].mensaje); 
        
    } catch (error) {
        return res.status(500).json({ 
            status:'error',
            message: error.message 
        });
    }
}

const updateMenuPerfil= async (req, res)=>{
    try {
        const body_json  = req.body;

        const consulta=`select * from sp_crud_menu_perfil ('U','${JSON.stringify(body_json)}'::json)`;
        const [results] = await sequelize.query(consulta);

        res.status(200).json(results[0].mensaje); 
        
    } catch (error) {
        return res.status(500).json({ 
            status:'error',
            message: error.message 
        });
    }
}

const deleteMenuPerfil= async (req, res)=>{
    try {
        const body_json  = req.body;

        const consulta=`select * from sp_crud_menu_perfil ('D','${JSON.stringify(body_json)}'::json)`;
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
    getBsqMenuPerfil,
    getBsqMenuPerfilByUser,
    createMenuPerfil,
    updateMenuPerfil,
    deleteMenuPerfil
}