const { response, request } = require('express');
const bcryptjs = require('bcryptjs')


const User = require('../models/user');
const { checkToken } = require('../helpers/verifyToken');
const { GET_USER_WITH_ROL } = require('../helpers/querys');
const sequelize = require('../database/db');


const createUser = async(req, res = response) => {
  const {token} = req.headers
  const {password}  = req.body
  
  console.log(`Se obtiene los siguientes datos para insertar el user `)
  console.log(req.body)
  
  if(!token)return res.status(400).json({ msg: `El token es obligatorio` })
    
  //verificamos el token si es valido o no ha expirado
  await checkToken(token,req.session.user.id_user)
  
 
   //verificamos si el usuario es adim 
 
  try {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    req.body.password = bcryptjs.hashSync(password, salt );  
    const user = await User.create(req.body);
    res.json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }  
}


const getUser = async(req,res)=>{
    const {token} = req.headers

    try {

      if(!token)return res.status(400).json({ msg: `El token es obligatorio` });
      
      //verificamos el token si es valido o no ha expirado
      await checkToken(token,req.session.user.id_user,res)
      
      console.log('Ejecutaremos este query');
      console.log(GET_USER_WITH_ROL);
      const [results,metadata] = await sequelize.query(
      GET_USER_WITH_ROL)
        results.map( us => delete us.password)
        console.log(results);
        res.json(results);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
}



const getUserBlocked = async(req,res)=>{
  const {token} = req.headers
  try {

  if(!token)return res.status(400).json({ msg: `El token es obligatorio` });
  
  //verificamos el token si es valido o no ha expirado
  await checkToken(token,req.session.user.id_user)
  

      const user = await User.findAll({attributes: {exclude: ['password']},where:{status:0}});
      res.json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
}

const getUserByID = async (req,res)=>{
    const {document:id_user} = req.params
    const {token} = req.headers

    try {
        if(!token)return res.status(400).json({ msg: `El token es obligatorio` });
        
        //verificamos si esta logueado y el token aun no ha expirado
        await checkToken(token,req.session.user.id_user)
        
        if( !id_user ) return res.status(400).json({ msg: `Se requiere el id del usuario` });
        const user = await User.findOne({where:{id_user}});

        if( !user ) return res.status(400).json({ msg: `Usuario con id ${id_user} no existe` });
        
        
        delete user.dataValues.password
        res.json(user);

      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    

}


const deleteUser = async(req,res)=>{
    const {id} = req.params
    const {token} = req.headers


    try {
      if(!token)return res.status(400).json({ msg: `El token es obligatorio` });
      
      //verificamos si esta logueado y el token aun no ha expirado
      await checkToken(token,req.session.user.id_user)
      
      console.log('Intentaremos eliminar el usuario');
      const user = await User.update({status:2},{where:{id_user:id}})
      if( !user ) return res.status(400).json({ msg: `Usuario con id ${id_user} no existe` });
      
      
      
      res.json({msg:'Usuario eliminado correctamente',user});

    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  
 

}

const updateUser = async(req,res) => {
  const {id} = req.params
  const {token} = req.headers

  console.log('Obtenemos los siguientes datos: ');
  console.log(req.body);

  try {
    if(!token)return res.status(400).json({ msg: `El token es obligatorio` });
    
    //verificamos si esta logueado y el token aun no ha expirado
    await checkToken(token,req.session.user.id_user)
    
    console.log('Intentaremos actualizar el usuario');
    const [rowCount] = await User.update(req.body,{where:{id_user:id}})
    console.log(rowCount);
    if( rowCount == 0 ) return res.status(400).json({ msg: `Usuario con id ${id} no existe` });
    
    
    
    res.json({msg:'Usuario acutalizado correctamente'});

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }



}

const getUserByDocument = async(document = '',id_user = '')=>{
  
  console.log(`Obtenemos los datos docuemnte : ${document} y id_user ${id_user}`);
    try {
       if(document !== ''){

         const user = await User.findOne({where:{document}});
          console.log('Se obtuvo el usuario');
        console.log(`Retornaremos los siguientes datos ${user.dataValues}`);        
          return user
       }else{
        const user = await User.findOne({where:{id_user}});
        return user

       }
        

        

      } catch (error) {
        return 'Ocurrio un error'
      }
    


}



module.exports = {
    getUser,
    getUserByID,
    createUser,
    deleteUser,
    updateUser,
    getUserByDocument,
    getUserBlocked
}