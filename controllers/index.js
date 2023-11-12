// import module
const router = require('express').Router();

// import routes
const apiRoutes = require('./api');
const homeRoutes = require('./homepageRoutes');
const blogPostRoutes = require('./blogPostRoutes');

// use routes 
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/blog', blogPostRoutes);

//export module
module.exports = router;
