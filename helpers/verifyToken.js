const Auth = require("../models/auth");

const checkToken = async (token,idUser,res)=>{
    try {
        const tokenExist = await Auth.findOne({where:{token}});
        if(!tokenExist)return res.status(400).json({msg:'Token no existe'});
        console.log('Token existe verificamos si no ha expirado');
        
        const date = new Date();
        if(tokenExist.created !== (date.toISOString().split('T')[0]))  return res.status(400).json({msg:'Token ha expirado'}); 
        console.log('EL token no ha expirado');
        console.log(tokenExist);
        //verificamos si pertence al usuario logueado
        if(tokenExist.id_user !== idUser)return res.status(400).json({msg:'El token no pertenece al usuario logueado'}); 
        
        
        return true    
    } catch (error) {
        console.log(error);
        return false;
    }
    

}

module.exports = {checkToken}