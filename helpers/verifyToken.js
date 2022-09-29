const Auth = require("../models/auth");

const checkToken = async (token)=>{
    const tokenExist = await Auth.findOne({where:{token}});
    if(!tokenExist)return false;
    console.log('Token existe verificamos si no ha expirado');
    console.log(tokenExist.created );
    const date = new Date();
    if(tokenExist.created !== (date.toISOString().split('T')[0]))  return false 
    console.log('EL token es valido');
    return true

}

module.exports = {checkToken}