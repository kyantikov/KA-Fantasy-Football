// const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
    var user = sequelize.define('user', {
        first_name:{ 
            type: DataTypes.STRING,
            notNull:true
        },
        last_name:{
            type:DataTypes.STRING,
            notNull:true,
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: { msg: "Email is invalid." },
            },
            unique: {
                args: true,
                msg: 'Email address already in use!'
            }
        },
        password: {
            type: DataTypes.STRING,
            notEmpty: {
                msg: "Password is required"
            } ,
            notNull:true
        }
    });
    user.associate = function (models) {
        user.hasOne(models.league, {foreignKey:'user_id'})
        user.hasMany(models.team, {foreignKey:'user_id'})
    };
    return user
}