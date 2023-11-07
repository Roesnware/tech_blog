// import module
const router = require('express').Router();

// import routes
const userRoutes = require('./userRoutes.js');
const blogPostRoutes = require('./blogPostRoutes.js');

// use routes 
router.use('/users', userRoutes);
router.use('/blogPosts', blogPostRoutes);

// export module
module.exports = router;
