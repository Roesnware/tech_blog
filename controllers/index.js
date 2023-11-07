// import module
const router = require('express').Router();

// import routes
const apiRoutes = require('./api');
const homeRoutes = require('./homepageRoutes');

// use routes 
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

//export module
module.exports = router;
