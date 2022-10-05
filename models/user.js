const { INTEGER, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const User = sequelize.define('users',{
    id_user :{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    document:{
        type:DataTypes.STRING,
        
    },
    password:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    status:{
        type:DataTypes.INTEGER,
    },
    name:{
        type:DataTypes.STRING
    },
    last_name:{
        type:DataTypes.STRING
    },
    phone:{
        type:DataTypes.STRING
    },
    register:{
        type:DataTypes.DATE
    },
    update_data:{
        type:DataTypes.DATE
    }


},{
    timestamps: false
})

module.exports = User;