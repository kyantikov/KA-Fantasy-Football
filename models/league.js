'use strict';
let user = require('./user')
module.exports = (sequelize, DataTypes) => {
  const league = sequelize.define('league', {
    league_name: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{msg:"League name is required."}
      },
    },
    draft_date:{
      type:DataTypes.DATE,
      validate:{
        notEmpty:{msg:"Draft Date is required."},
      }
    },
    max_teams:{
      type:DataTypes.INTEGER,
      validate:{
        notEmpty:{msg:"max teams required"}
      }
    },
    team_count:{
      type:DataTypes.INTEGER,
      defaultValue:'1',
    }
  })
  league.associate = function (models) {
    league.hasMany(models.team, {foreignKey:'league_id'})
  };
  return league;
};