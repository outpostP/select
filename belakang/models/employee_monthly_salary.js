'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee_Monthly_Salary extends Model {

    static associate(models) {
      this.belongsTo(models.Employee_Details, {
        foreignKey:'emp_id',
       })
    }
  }
  Employee_Monthly_Salary.init({
    monthly_salary: {
      type:DataTypes.FLOAT,
      defaultValue: 0
    },
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
    modelName: 'Employee_Monthly_Salary',
  });
  return Employee_Monthly_Salary;
};