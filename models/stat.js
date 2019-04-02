'use strict';
module.exports = (sequelize, DataTypes) => {
  const stat = sequelize.define('stat', {
    pass_comp: {
      type:DataTypes.INTEGER,
      defaultValue: 0,
    },
    pass_att: {
      type:DataTypes.INTEGER,
      defaultValue: 0,
    },
    pass_yds: {
      type:DataTypes.INTEGER,
      defaultValue: 0,
    },
    pass_td: {
      type:DataTypes.INTEGER,
      defaultValue: 0,
    },
    pass_int: {
      type:DataTypes.INTEGER,
      defaultValue: 0,
    },
    pass_fum: {
      type:DataTypes.INTEGER,
      defaultValue: 0,
    },
    rush_att: {
      type:DataTypes.INTEGER,
      defaultValue: 0,
    },
    rush_yds: {
      type:DataTypes.INTEGER,
      defaultValue: 0,
    },
    rush_td: {
      type:DataTypes.INTEGER,
      defaultValue: 0,
    },
    rush_fum: {
      type:DataTypes.INTEGER,
      defaultValue: 0,
    },
    rec: {
      type:DataTypes.INTEGER,
      defaultValue: 0,
    },
    rec_yds: {
      type:DataTypes.INTEGER,
      defaultValue: 0,
    },
    rec_td: {
      type:DataTypes.INTEGER,
      defaultValue: 0,
    },
    rec_fum: {
      type:DataTypes.INTEGER,
      defaultValue: 0,
    },
    fg_made: {
      type:DataTypes.INTEGER,
      defaultValue: 0,
    },
    xp_made: {
      type:DataTypes.INTEGER,
      defaultValue: 0,
    },
});
  stat.associate = function(models) {
    stat.belongsTo(models.player, {foreignKey:'player_id'})
    stat.hasOne(models.week, {foreignKey:'week_id'})
  };
  return stat;
};