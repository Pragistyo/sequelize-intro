'use strict';
module.exports = function(sequelize, DataTypes) {
  var Subjects = sequelize.define('Subjects', {
    subject_name: DataTypes.STRING
  });

  Subjects.associate = models => {
      Subjects.hasMany(models.Teacher, {foreignKey: 'subjectId'})
      Subjects.belongsToMany(models.Student, {through: 'student_subject'})
    }
    // Subjects.hasMany(models.Teacher, {foreignKey: 'subject_id'})
  return Subjects;
};
