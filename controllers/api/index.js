// import module
const router = require('express').Router();

// import routes
const userRoutes = require('./userRoutes.js');
const reviewRoutes = require('./reviewRoutes.js');

// use routes 
router.use('/users', userRoutes);
router.use('/reviews', reviewRoutes);

// export module
module.exports = router;
