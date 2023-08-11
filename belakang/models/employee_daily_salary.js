'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee_Daily_Salary extends Model {

    static associate(models) {
     this.belongsTo(models.Employee_Details, {
      foreignKey:'emp_id',
     })
    }
  }
  Employee_Daily_Salary.init({
      base_salary: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      type: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      emp_id: {
        type: DataTypes.INTEGER,
        allowNull: false
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
    modelName: 'Employee_Daily_Salary',
  });
  return Employee_Daily_Salary;
};