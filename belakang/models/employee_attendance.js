'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee_Attendance extends Model {
    static associate(models) {
      this.belongsTo(models.Employee_Details, {
        foreignKey:'emp_id',
       })
    }
  }
  Employee_Attendance.init({
    hasIn: {
      type:DataTypes.BOOLEAN,
      defaultValue: true
    },
    hasOut: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
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
    modelName: 'Employee_Attendance',
  });
  return Employee_Attendance;
};