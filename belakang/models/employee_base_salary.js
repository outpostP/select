'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee_Base_Salary extends Model {
    static associate(models) {
      this.belongsTo(models.Employee_Details, {
        foreignKey:'emp_id',
       })
    }
  }
  Employee_Base_Salary.init({
    emp_id: DataTypes.INTEGER,
    base_salary: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Employee_Base_Salary',
  });
  return Employee_Base_Salary;
};