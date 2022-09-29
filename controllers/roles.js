const sequelize = require("../database/db");
const { GET_ROL_BY_ID } = require("../helpers/querys");
const { checkToken } = require("../helpers/verifyToken")

const getRolesById = async(req,res) => {
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


module.exports = {
    getRolesById
}