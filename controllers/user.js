const { response, request } = require('express');
const bcryptjs = require('bcryptjs')


const User = require('../models/user');
const { where } = require('sequelize');

const getUser = async(req,res)=>{
    try {
        const note = await User.findAll();
        res.json(note);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
}

const createUser = async(req, res = response) => {
    const {password}  = req.body

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    req.body.password = bcryptjs.hashSync(password, salt );

    console.log(req.body);
    try {
        
        const newTask = await User.create(req.body);
        res.json(newTask);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }  
}

const getUserByID = async (req,res)=>{
    const {document:id_user} = req.params
    

    try {
        if( !id_user ) return res.status(400).json({ msg: `Se requiere el id del usuario` });
        const user = await User.findOne({where:{id_user}});

        if( !user ) return res.status(400).json({ msg: `Usuario con id ${id_user} no existe` });
        delete user.dataValues.password
        res.json(user);

      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    

}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    
    res.json(usuario);
}




module.exports = {
    getUser,
    getUserByID,
    createUser,
}