// const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
    var user = sequelize.define('user', {
        first_name:{ 
            type: DataTypes.STRING,
            validate: {
                notEmpty:{msg:'First name is required'}
            }
        },
        last_name:{
            type:DataTypes.STRING,
            validate: {
                notEmpty:{msg:'Last name is required'}
            }
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
            validate:{
                notEmpty: {msg:'Password is required'},
                len: {args:[8,50], msg:'Password must be greater than 8 characters'},
            },
        }
    });
    user.associate = function (models) {
        user.hasOne(models.league, {foreignKey:'user_id'})
        user.hasMany(models.team, {foreignKey:'user_id'})
    };
    return user
}