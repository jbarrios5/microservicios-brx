const { response } = require('express');
const bcryptjs = require('bcryptjs')
const {v4:uuid} = require('uuid')


const User = require('../models/user');
const Auth = require('../models/auth');




const login = async(req, res = response) => {

    const { email, password } = req.body;
    console.log(req.session);
    

    try {
      
        // Verificar si el email existe
        const user = await User.findOne({ where:{email} });
        console.log('Obtuvimos el usuario: ');
        console.log(user.dataValues);
        if ( !user ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }
        // SI el usuario está activo
        if ( user.status == 0  ) {
            return res.status(400).json({
                msg: 'Usuario inactivo',
                errorCode: 1002
            });
        }
       

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }
        req.session.user = user
        console.log(req.session.user);
        // Generar el JWT
        const token = uuid()
        console.log(token);
        const auth  = await Auth.create({id_user:user.id_user,token:token,created:new Date()})
        console.log(auth);
        delete user.dataValues.password
        res.json({
            user,
            token

            
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }   

}




module.exports = {
    login,
}
