'use strict';
module.exports = (sequelize, DataTypes) => {
  const team = sequelize.define('team', {
    team_name: {
      type: DataTypes.STRING,
      defaultValue: 'My Team'
    },
  });
  team.associate = function(models) {
    team.belongsToMany(models.player, {through:'team_has_players', foreignKey:'player_id'})
    team.belongsTo(models.league, {foreignKey:'league_id'})
  };
  return team;
};