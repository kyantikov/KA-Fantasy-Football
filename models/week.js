'use strict';
module.exports = (sequelize, DataTypes) => {
  const week = sequelize.define('week', {
    week_num: DataTypes.INTEGER
  }, {});
  week.associate = function(models) {
  };
  return week;
};