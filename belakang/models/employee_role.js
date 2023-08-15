'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee_Role extends Model {
    static associate(models) {
      this.hasMany(models.Employee_Details, {
        foreignKey:'role_id',
       })
    }
  }
  Employee_Role.init({
    role: {
      type:DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Employee_Role',
  });
  return Employee_Role;
};