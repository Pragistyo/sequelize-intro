'use strict';
module.exports = function(sequelize, DataTypes) {
  var Subjects = sequelize.define('Subjects', {
    subject_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here

      Subjects.hasMany(models.Teacher, {foreignKey: 'subject_id'})
      }
    }
  });

  return Subjects;
};
