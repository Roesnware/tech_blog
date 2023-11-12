// import modules
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// blogpost model
class BlogPost extends Model {}

// blogpost constructor
BlogPost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    blogPost_content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'blogpost',
  }
);

// export module
module.exports = BlogPost;
