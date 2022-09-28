const {Sequelize}= require('sequelize')
//Parametros
//1-Nombre de la db
//2-Usuario
//3-Pass
const sequelize = new Sequelize('gestionagil_prodDB','gestionagil_proyecto','Kj9JWqn}2(-x',{
    host:'216.238.102.246',
    dialect:'mysql'
})

module.exports = sequelize;