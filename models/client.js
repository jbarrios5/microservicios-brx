const { INTEGER, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Client = sequelize.define('clients',{
    id_client :{
        type:DataTypes.INTEGER,
        autoIncrement:true,
    },
    document:{
        type:DataTypes.STRING,
        primaryKey:true
        
    },
    
    name:{
        type:DataTypes.STRING
    },
    last_name:{
        type:DataTypes.STRING
    },
    address:{
        type:DataTypes.STRING
    },
    phone:{
        type:DataTypes.STRING
    },
    status:{
        type:DataTypes.INTEGER,
    },
},{
    timestamps: false
})

module.exports = Client;