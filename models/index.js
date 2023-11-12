// import models 
const BlogPost = require('../models/BlogPost.js');
const Comments = require('../models/Comments.js');
const User = require('../models/User.js');

// each blog post belongs to user 
BlogPost.belongsTo(User, {
    foreignKey: 'user_id',
});

// each comment belongs to user 
Comments.belongsTo(User, {
    foreignKey: 'user_id',
});

// each blog post has many comments
BlogPost.hasMany(Comments, {
    foreignKey: 'blogpost_id',
    onDelete: 'CASCADE',
});

// export module 
module.exports = { User, BlogPost, Comments }; 