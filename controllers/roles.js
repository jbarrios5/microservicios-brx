const sequelize = require("../database/db");
const { GET_ROL_BY_ID, ADD_ROL_TO_USER } = require("../helpers/querys");
const { checkToken } = require("../helpers/verifyToken");
const Role = require("../models/role");
const { getUserByDocument } = require("./user");

const createRole = async (req,res) => {
  const {token} = req.headers
  
  console.log(`Se obtiene los siguientes datos para insertar el rol `)
  console.log(req.body)
  
  if(!token)return res.status(400).json({ msg: `El token es obligatorio` })
    
  //verificamos el token si es valido o no ha expirado
  const isToken = await checkToken(token)
  if(!isToken)return res.status(400).json({ msg: `El token no existe o ha expirado` })
 
   
 
  try {
    console.log('Intentaremos crear un role con los siguientes datos');
    console.log(req.body);
    const role = await Role.create(req.body);
    res.json(role);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
}


//obtiene el rol por usuario
const getRolesByUserId = async(req,res) => {
    const {token} = req.headers
    const {id:id_user} = req.params

    if(!token)return res.status(400).json({ msg: `El token es obligatorio` });
    
    //verificamos el token si es valido o no ha expirado
    const isToken = await checkToken(token)
    if(!isToken)return res.status(400).json({ msg: `El token no existe o ha expirado` });

    const [results,metadata] = await sequelize.query(
        GET_ROL_BY_ID + id_user
      );
      
    
    res.json(results)
      


}
const getRoles = async (req,res)=>{
    const {token} = req.headers
    try {

    if(!token)return res.status(400).json({ msg: `El token es obligatorio` });
    
    //verificamos el token si es valido o no ha expirado
    const isToken = await checkToken(token)
    if(!isToken)return res.status(400).json({ msg: `El token no existe o ha expirado` });

        const roles = await Role.findAll({where:{status:1}});
        console.log('Obtenemos los siguientes datos');
        console.log(roles.dataValues);
        res.json(roles);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
}
const addRoleToUser = async (req,res) => {
  const {token} = req.headers
  
  console.log(`Se obtiene los siguientes datos para insertar el rol al usuario `)
  console.log(req.body)
  
  if(!token)return res.status(400).json({ msg: `El token es obligatorio` })
    
  //verificamos el token si es valido o no ha expirado
  const isToken = await checkToken(token)
  if(!isToken)return res.status(400).json({ msg: `El token no existe o ha expirado` })
 
   const user = await getUserByDocument(req.body.document)
   console.log('Obtenemos el usuario');
   console.log(user.dataValues);
    
 
  try {
    const [results,metadata] = await sequelize.query(
      ADD_ROL_TO_USER,{
        replacements:[user.id_user,req.body.id_role]
      }     
      
    );
    res.json({msg:'Se ha insertado los datos correctamente'});
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getRolesByUserId,
    getRoles,
    createRole,
    addRoleToUser
    
}