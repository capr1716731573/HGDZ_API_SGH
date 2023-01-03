const {sequelize} = require('../../config/database');

const getBsqMenuPerfilUsuario= async (req, res)=>{
    try {
        let perfil = req.params.p;
        let usuario = req.params.u;
        const consulta=`select * from sp_sga_usuario_perfiles(${ usuario },${ perfil })`;
        const [results,metadata] = await sequelize.query(consulta);
  
        res.status(200).json({
            status: 'ok',
            rows: results[0].mensaje.Resultado,
            count: metadata.rowCount
        }); 
        
    } catch (error) {
        return res.status(500).json({ 
            status:'error',
            message: error.message 
        });
    }
}


module.exports={
    getBsqMenuPerfilUsuario,
}