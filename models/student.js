'use strict';
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
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
                },
      }
    },
    full_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Student;
};
