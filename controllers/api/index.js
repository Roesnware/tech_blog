// import module
const router = require('express').Router();

// import routes
const userRoutes = require('./userRoutes.js');
const blogPostRoutes = require('./blogPostRoutes.js');
const commentsRoutes = require('./commentsRoutes.js');

// use routes 
router.use('/users', userRoutes);
router.use('/blogPosts', blogPostRoutes);
router.use('/comments', commentsRoutes);

// export module
module.exports = router;
