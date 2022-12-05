const {sequelize} = require('../config/database');

const getAllItemsMenu= async (req, res) => {
    try {
        let padre = req.query.padre;
        padre = Number(padre);
        let consulta='';
        if (req.query.padre) {
            consulta=`select * from items_menu WHERE pk_padre=${padre} ORDER BY pk_menu ASC`;
        } else {
            consulta=`select * from items_menu WHERE pk_padre=0 ORDER BY pk_menu ASC`;
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

const getBsqItemsMenu= async (req, res) => {
    try {
      let busqueda = req.params.bsq;
      const consulta = `SELECT * FROM items_menu WHERE nombre_menu LIKE '%${busqueda}%'`;
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

const getItemsMenu= async (req, res) => {
    try {
        const { id } = req.params;
        const consulta = `SELECT * FROM items_menu WHERE pk_menu= ${ id }`;
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

const createItemsMenu= async (req, res)=>{
    try {
        const body_json  = req.body;

        const consulta=`select * from sp_crud_menu_items ('I','${JSON.stringify(body_json)}'::json)`;
        const [results] = await sequelize.query(consulta);

        res.status(200).json(results[0].mensaje); 
        
    } catch (error) {
        return res.status(500).json({ 
            status:'error',
            message: error.message 
        });
    }
}

const updateItemsMenu= async (req, res)=>{
    try {
        const body_json  = req.body;

        const consulta=`select * from sp_crud_menu_items ('U','${JSON.stringify(body_json)}'::json)`;
        const [results] = await sequelize.query(consulta);

        res.status(200).json(results[0].mensaje); 
        
    } catch (error) {
        return res.status(500).json({ 
            status:'error',
            message: error.message 
        });
    }
}

const deleteItemsMenu= async (req, res)=>{
    try {
        const body_json  = req.body;

        const consulta=`select * from sp_crud_menu_items ('D','${JSON.stringify(body_json)}'::json)`;
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
    getAllItemsMenu,
    getItemsMenu,
    getBsqItemsMenu,
    createItemsMenu,
    updateItemsMenu,
    deleteItemsMenu
}