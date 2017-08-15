'use strict';
module.exports = function(sequelize, DataTypes) {
  var student_subject = sequelize.define('student_subject', {
    studentId: DataTypes.INTEGER,
    studentSubject: DataTypes.STRING,
    SUBJECTID:  DataTypes.INTEGER
  });

    student_subject.associate = models => {
        student_subject.belongsTo(models.Student)
        student_subject.belongsTo(models.Subjects)
    }

    return student_subject;
  };
