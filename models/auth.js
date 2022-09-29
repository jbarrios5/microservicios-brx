const { INTEGER, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Auth = sequelize.define('auths',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    id_user:{
        type:DataTypes.INTEGER
        
    },
    token:{
        type:DataTypes.STRING
    },
    
    created:{
        type:DataTypes.DATE
    },

},{
    timestamps: false
})

module.exports = Auth;