'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Edit_URL extends Model {
    static associate(models) {
      this.belongsTo(models.Employee_Details, {
        foreignKey:'emp_id',
       })
    }
  }
  Edit_URL.init({
    URL: {
      type:DataTypes.STRING,
    },
    emp_id: {
      type:DataTypes.INTEGER
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
    modelName: 'Edit_URL',
  });
  return Edit_URL;
};