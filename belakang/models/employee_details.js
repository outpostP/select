'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee_Details extends Model {
    static associate(models) {
      this.belongsTo(models.Employee_Role, {
        foreignKey:'role_id',
       })
       this.hasMany(models.Edit_URL, {
        foreignKey:'emp_id',
       })
       this.hasMany(models.Employee_Daily_Salary, {
        foreignKey:'emp_id',
       })
       this.hasMany(models.Employee_Monthly_Salary, {
        foreignKey:'emp_id',
       })
       this.hasMany(models.Employee_Attendance, {
        foreignKey:'emp_id',
       })
       this.hasOne(models.Employee_Base_Salary, {
        foreignKey:'emp_id',
       })
    }
  }
  Employee_Details.init({
    name: {
      type:DataTypes.STRING,
      allowNull: true
    },
    email: {
      type:DataTypes.STRING,
      allowNull: true
    },
    password: {
      type:DataTypes.STRING,
      allowNull: true
    },
    birthday: {
      type:DataTypes.DATE,
      allowNull: true
    },
    role_id: {
      type:DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 2
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
    modelName: 'Employee_Details',
  });
  return Employee_Details;
};