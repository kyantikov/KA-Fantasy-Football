'use strict';
module.exports = (sequelize, DataTypes) => {
  const player = sequelize.define('player', {
    active: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    jersey_num: DataTypes.INTEGER,
    position: DataTypes.STRING,
    team_code: DataTypes.STRING,
  }, {});
  player.associate = function(models) {
    player.belongsToMany(models.team, {through:'team_has_players', foreignKey:'team_id'})
    player.hasOne(models.stat, {foreignKey:'player_id'})
  };
  return player;
};