'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee_In extends Model {
 
    static associate(models) {
      this.belongsTo(models.Employee_Details, {
        foreignKey:'emp_id',
       })
    }
  }
  Employee_In.init({
    emp_id: {
      type:DataTypes.INTEGER,
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
    modelName: 'Employee_In',
  });
  return Employee_In;
};