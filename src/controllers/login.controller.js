const {sequelize} = require('../config/database');

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const variablesEntorno=process.env;

const login= async (req, res) => {
try {
    const body = req.body;

    const usuario = {
        user: body.user,
        password: body.password
    };

    //consulta si existen un registro del existente
    consulta = `SELECT * FROM usuario usu INNER JOIN persona p on usu.pk_person = p.pk_person
    WHERE usu.visible_user=true AND usu.usuario_user= '${usuario.user}'`;

    //consulta=`select * from profesion p `;
    const [results,metadata] = await sequelize.query(consulta);

    //Controla sino encuentra el usuario en la Base de Datos
    if (metadata.rowCount === 0) {
        return res.status(400).json({
            status: 'error',
            mensaje: 'Credenciales incorrectas - email'
        });
    };

        //Si hay valores escojo el primero, ya que si busco uno es xq debe serv unico
    const usuarioDB = results[0];

    //Verificamos contrasena - compara un string con otro que ya utilizo el bcrypt
    if (!bcryptjs.compareSync(usuario.password, usuarioDB.password_user)) {
        return res.status(400).json({
            status: 'error',
            mensaje: 'Credenciales incorrectas - password'
        });
    }

    /********* creo el token***********
     1.-Instalamos jsonwebtoken --->  npm install jsonwebtoken --save
     var token = jwt.sign({ PAYLOD o cuerpo del token }, 'SEMILLA O PARABRA QUE SE ENCIPTA PARA GENERAL EL TOKEN', { expiresIn: FECHA DE EXPIRACION DEL TOKEN })*/
    /* -------------------------------- */
    const token = jwt.sign({ usuario: usuarioDB }, variablesEntorno.JWT_SECRET, { expiresIn: 14400 })

    res.status(200).json({
        status: 'ok',
        usuario: usuarioDB,
        token: token,
        id: usuarioDB._id,
    }); 

    } catch (error) {
        return res.status(500).json({ 
            status:'error',
            message: error.message 
        });
    }

}



module.exports={
    login
}