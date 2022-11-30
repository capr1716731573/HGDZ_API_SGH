const {sequelize} = require('../config/database');
require('dotenv').config();
const variablesEntorno=process.env; 

/*********************************************
TABLA RECURSIVA SE HACE VARIAS CONSULTAS A LA 
BASE DE DATOS
/********************************************* */
//DATOS DE LA TABLA
    const datos_tabla = {
        tabla_target: 'geografia',
        pk_tabla: 'pk_ubigeo',
        sp_crud_tabla: 'sp_crud_ubicacion_geografica'
    }

    const consulta_parroquia = "SELECT " +
    "n.pk_ubigeo as pk_pais," +
    "n.nombre_ubigeo as nombre_pais," +
    "p.pk_ubigeo as pk_provincia," +
    "p.nombre_ubigeo as nombre_provincia," +
    "c.pk_ubigeo as pk_ciudad," +
    "c.nombre_ubigeo as nombre_ciudad," +
    "pr.pk_ubigeo as pk_parroquia," +
    "pr.nombre_ubigeo as nombre_parroquia " +
    "FROM geografia pr " +
    "INNER JOIN geografia c " +
    "INNER JOIN geografia p " +
    "INNER JOIN geografia n ON p.fk_padre=n.pk_ubigeo " +
    "ON c.fk_padre=p.pk_ubigeo " +
    "ON pr.fk_padre=c.pk_ubigeo " +
    "WHERE pr.tipo_ubigeo='PR' and pr.pk_ubigeo="

    const consulta_ciudad = "SELECT " +
    "n.pk_ubigeo as pk_pais," +
    "n.nombre_ubigeo as nombre_pais," +
    "p.pk_ubigeo as pk_provincia," +
    "p.nombre_ubigeo as nombre_provincia," +
    "c.pk_ubigeo as pk_ciudad," +
    "c.nombre_ubigeo as nombre_ciudad " +
    "FROM geografia c " +
    "INNER JOIN geografia p " +
    "INNER JOIN geografia n ON p.fk_padre=n.pk_ubigeo " +
    "ON c.fk_padre=p.pk_ubigeo " +
    "WHERE c.tipo_ubigeo='C' and c.pk_ubigeo="

    const consulta_provincia = "SELECT " +
    "n.pk_ubigeo as pk_pais," +
    "n.nombre_ubigeo as nombre_pais," +
    "p.pk_ubigeo as pk_provincia," +
    "p.nombre_ubigeo as nombre_provincia " +
    "FROM geografia p " +
    "INNER JOIN geografia n ON p.fk_padre=n.pk_ubigeo " +
    "WHERE p.tipo_ubigeo='P' and p.pk_ubigeo=";

    let pk_pais = 74 //Se refiere a ECUADOR

    const consultaTodosXPais = "SELECT pk_ubigeo,nombre_ubigeo,fk_padre, " +
    " (CASE tipo_ubigeo" +
    "      WHEN 'N' THEN 'PAÍS'" +
    "      WHEN 'P' THEN 'PROVINCIA'" +
    "      WHEN 'C' THEN 'CIUDAD'" +
    "      WHEN 'PR' THEN 'PARROQUIA' END) tipo" +
    " FROM geografia WHERE pk_ubigeo=" + pk_pais + " AND tipo_ubigeo='N'" +
    " UNION" +
    " SELECT pk_ubigeo,nombre_ubigeo,fk_padre," +
    " (CASE tipo_ubigeo" +
    "      WHEN 'N' THEN 'PAÍS'" +
    "      WHEN 'P' THEN 'PROVINCIA'" +
    "      WHEN 'C' THEN 'CIUDAD'" +
    "      WHEN 'PR' THEN 'PARROQUIA' END) tipo FROM geografia WHERE fk_padre=" + pk_pais + " AND tipo_ubigeo='P'" +
    " UNION" +
    " SELECT pk_ubigeo,nombre_ubigeo,fk_padre," +
    " (CASE tipo_ubigeo" +
    "      WHEN 'N' THEN 'PAÍS'" +
    "      WHEN 'P' THEN 'PROVINCIA'" +
    "      WHEN 'C' THEN 'CIUDAD'" +
    "      WHEN 'PR' THEN 'PARROQUIA' END) tipo FROM geografia WHERE tipo_ubigeo='C' AND fk_padre<=284" +
    " UNION" +
    " SELECT pk_ubigeo,nombre_ubigeo,fk_padre," +
    " (CASE tipo_ubigeo" +
    "      WHEN 'N' THEN 'PAÍS'" +
    "      WHEN 'P' THEN 'PROVINCIA'" +
    "      WHEN 'C' THEN 'CIUDAD'" +
    "      WHEN 'PR' THEN 'PARROQUIA' END) tipo FROM geografia WHERE tipo_ubigeo='PR'" +
    " ORDER BY pk_ubigeo ASC, fk_padre ASC";


const getGeografiasXPadre=async(req,res)=>{
    try {
        let desde = req.query.desde;
        let consulta='';
        desde = Number(desde);
        const fk_padre = req.params.fk_padre;

        //valido que exista el parametro "desde"
        if (req.query.desde) {
            consulta = `SELECT * FROM ${datos_tabla.tabla_target} WHERE fk_padre=${fk_padre} LIMIT ${ variablesEntorno.ROWS_X_PAGE } OFFSET ${ desde }`;
        } else {
            consulta = `SELECT * FROM ${datos_tabla.tabla_target} WHERE fk_padre=${fk_padre}`;
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

const getAllXPais= async(req,res) => {
    try {
        pk_pais = req.params.pais || 74;
        //SOLO SELECCIONO LA UBICACION GEOGRAFICA DE ECUADOR
        let consulta=consultaTodosXPais;
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

const getGeografias= async (req, res) => {
    try {
        const consulta=`select * from geografia p order by nombre_prof ASC`;
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

const getBusqueda = async (req, res) => {
    try {       
        let busqueda = req.params.valor;
        let fk_padre = req.params.fk_padre;
        //valido que exista el parametro "desde"
        const consulta = `SELECT * FROM ${datos_tabla.tabla_target} WHERE fk_padre=${fk_padre} AND nombre_ubigeo LIKE '%${busqueda}%'`;
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

const getGeografiaID = async (req, res) =>{
    try {
        //con req.params.PARAMETRO .. recibe el parametro que envio en la peticion PUT con el campo id (/:id) que es igual al nombre del modelo
        let id = req.params.id;
        //consulta si existen un registro del existente
        let consulta = `SELECT * FROM ${datos_tabla.tabla_target} WHERE ${datos_tabla.pk_tabla}= ${ id }`;
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

const getGeografiaTipo= async (req, res) => {
    try {
        const { tipo, id } = req.params;
        let consulta ='';
        console.log(id);
        switch (tipo) {
            case 'P':
                consulta=consulta_provincia+id;
                break;
            case 'C':
                consulta=consulta_ciudad+id;
                break;
            case 'PR':
                consulta=consulta_parroquia+id;
            break;
        
        }
       
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

const crudGeografia= async (req,res) => {
    try {
        
        const accion = req.params.accion;
        const body_json  = req.body;
        const consulta=`select * from sp_crud_ubicacion_geografica ('${accion}','${JSON.stringify(body_json)}'::json)`;
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
    getGeografiasXPadre,
    getAllXPais,
    getBusqueda,
    getGeografiaID ,
    getGeografiaTipo,
    getGeografias,
    crudGeografia
}