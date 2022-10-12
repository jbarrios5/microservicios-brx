const { checkToken } = require("../helpers/verifyToken");
const Client = require("../models/client");

const getAllClients = async(req,res)=>{
    console.log('Starting to get clients');
    const {token} = req.headers
    try {

    if(!token)return res.status(400).json({ msg: `El token es obligatorio` });
    
    //verificamos el token si es valido o no ha expirado
    await checkToken(token,req.session.user.id_user)
    ;

        const clients = await  Client.findAll({where:{status:1}});
        res.json(clients);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
}
const createClient = async(req, res = response) => {
    const {token} = req.headers
    
    
    console.log(`Se obtiene los siguientes datos para insertar el cliente .... `)
    console.log(req.body)
    
    if(!token)return res.status(400).json({ msg: `El token es obligatorio` })
      
    //verificamos el token si es valido o no ha expirado
    await checkToken(token,req.session.user.id_user)
    
   

   
    try {
      
      const client = await Client.create(req.body);
      res.json({msg:'Cliente creado correctamente!',client});
      } catch (error) {
        console.log(error.errors);
        return res.status(500).json({ 
            message: error.message ,
            msg:error.errors});
      }  
  }
  
  const deleteClient = async(req,res)=>{
    const {id} = req.params
    const {token} = req.headers


    try {
      if(!token)return res.status(400).json({ msg: `El token es obligatorio` });
      
      //verificamos si esta logueado y el token aun no ha expirado
      await checkToken(token,req.session.user.id_user)
      ;
      console.log('Intentaremos eliminar el cliente');
      const client = await Client.update( {status:2}, {where:{id_client:id}})
      if( !client ) return res.status(400).json({ msg: `Cliente con id ${id} no existe` });
      
      
      
      res.json({msg:'Cliente eliminado correctamente'});

    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  
 

}
const updateClient = async(req,res) => {
  const {id} = req.params
  const {token} = req.headers

  console.log('Obtenemos los siguientes datos: ');
  console.log(req.body);

  try {
    if(!token)return res.status(400).json({ msg: `El token es obligatorio` });
    
    //verificamos si esta logueado y el token aun no ha expirado
    await checkToken(token,req.session.user.id_user)
    
    console.log('Intentaremos actualizar el cliente');
    const [rowCount] = await Client.update(req.body,{where:{id_client:id}})
    console.log(rowCount);
    if( rowCount == 0 ) return res.status(400).json({ msg: `Cliente con id ${id} no existe` });
    
    
    
    res.json({msg:'Cliente acutalizado correctamente'});

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }



}
const getClientByID = async (req,res)=>{
  const {id:id_client} = req.params
  const {token} = req.headers

  try {
      if(!token)return res.status(400).json({ msg: `El token es obligatorio` });
      
      //verificamos si esta logueado y el token aun no ha expirado
      await checkToken(token,req.session.user.id_user)
      
      if( !id_client ) return res.status(400).json({ msg: `Se requiere el documento del usuario` });
      const client = await Client.findOne({where:{id_client}});

      if( !client ) return res.status(400).json({ msg: `Usuario con id ${id_client} no existe` });
      
      res.json(client);


    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  

}

module.exports = {
    getAllClients,
    createClient,
    deleteClient,
    updateClient,
    getClientByID
}