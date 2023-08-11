'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee_Out extends Model {
  
    static associate(models) {
      this.belongsTo(models.Employee_Details, {
        foreignKey:'emp_id',
       })
    }
  }
  Employee_Out.init({
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
    modelName: 'Employee_Out',
  });
  return Employee_Out;
};