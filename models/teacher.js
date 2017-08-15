'use strict';
module.exports = function(sequelize, DataTypes) {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    subject: DataTypes.STRING,
    subjectId: DataTypes.INTEGER,
    email: {
        type:      DataTypes.STRING,
        allowNull: false,
        unique:
          {
            args:true,
            msg: 'Email already taken !!'
          },
          validate:  {
            isEmail: {
                        args: true,
                        msg: 'The email you entered is invalid or is already in our system.'
                    }
          }
        },
  });

  Teacher.associate = models => {
    Teacher.belongsTo(models.Subjects, {foreignKey: "subjectId"})
  }
  return Teacher;
};
