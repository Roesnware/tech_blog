// import modules
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// comment model
class Comments extends Model {

  setDate() {
    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }
}

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
    created_date: {
      type: DataTypes.STRING,
    }
  },
  {
    hooks: {
      beforeCreate: async (newCommentData) => {

        newCommentData.created_date = await newCommentData.setDate();

        return newCommentData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

// export module
module.exports = Comments;
