// import modules
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// blogpost model
class BlogPost extends Model {

  setDate() {
    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }

}

// blogpost constructor
BlogPost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_date: {
      type: DataTypes.STRING,
    }
  },
  {
    hooks: {
      beforeCreate: async (newBlogData) => {

        newBlogData.created_date = await newBlogData.setDate();

        return newBlogData;
      },
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'blogpost',
  }
);

// export module
module.exports = BlogPost;
