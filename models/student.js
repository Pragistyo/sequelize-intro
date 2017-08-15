module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
    type:      DataTypes.STRING,
    allowNull: false,
    unique:{
      msg: 'The email you entered is already in our system'
    },
    validate:  {
      isEmail: {
                    args: true,
                    msg: 'The email you entered is invalid.'
                },
      }
    },
    full_name: DataTypes.STRING
  });

  Student.associate = models => {
    Student.belongsToMany(models.Subjects, {through: 'student_subject'})
    }

  return Student;
};
