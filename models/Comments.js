// import modules
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// comment model
class Comments extends Model {}

// comment constructor
Comments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

// export module
module.exports = Comments;
