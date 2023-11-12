// import modules 
const router = require('express').Router();
const { User } = require('../../models');

// post route to signup 
router.post('/', async (req, res) => {
  try { // try 
    // create user using body 
    const userData = await User.create(req.body);

    // save session 
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) { // catch err
    res.status(400).json(err);
  }
});

// post route to login 
router.post('/login', async (req, res) => {
  try { //try 

    // search users by username 
    const userData = await User.findOne(
      {
        where:
        {
          username: req.body.username
        }
      });

    // no user with that username
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username, please try again' });
      return;
    }

    // check password
    const validPassword = await userData.checkPassword(req.body.password);

    // bad password 
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect password, please try again' });
      return;
    }

    // success sav session 
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) { // catch err
    res.status(400).json(err);
  }
});

// post route to logout 
router.post('/logout', (req, res) => {
  // make sure logged in 
  if (req.session.logged_in) {
    // destroy session 
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// epxort module 
module.exports = router;
