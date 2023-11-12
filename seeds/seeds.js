// import modules
const userSeederData = require('./users.json');
const { User } = require('../models');
const sequelize = require('../config/connection.js');

// func to seed db with bulkcreate 
const seedDatabase = async () => {
    // await connection/sync
    await sequelize.sync({ force: true });

    // bulk create users
    const users = await User.bulkCreate(userSeederData, {
        individualHooks: true,
        returning: true,
    }
    );

    // bulk create reviews
    //const reviews = await Review.bulkCreate(reviewSeederData, {});

    // exit process after seeding 
    process.exit(0);
};

// call func to seed db
seedDatabase();