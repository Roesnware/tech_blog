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
    comment_content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

// export module
module.exports = Comments;
