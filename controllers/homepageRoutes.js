const router = require('express').Router();
const { BlogPost } = require('../models');
const withAuth = require('../utils/auth');

router.get('/homepage', async (req, res) => {
  try {
    // get all blogPosts 
    const allBlogPost = await BlogPost.findAll({});

    // serialize blogPosts so the template can read it
    const blogPosts = allBlogPost.map((blogPost) => blogPost.get({ plain: true}));

    // pass serialized blogPosts and session flag into template
    res.render('homepage', {
      blogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get request to dashboard withAuth middleware to prevent access to route if not logged in
router.get('/dashboard', withAuth, async (req, res) => {
  try {

  } catch (err) {
    res.status(500).json(err);
  }
});

// get request to login 
router.get('/login', (req, res) => {
  // user already logged in redirect to homepage
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }
  // otherwise render login page 
  res.render('login');
});

// get request to login 
router.get('/signup', (req, res) => {
  // user already logged in redirect to homepage
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }
  // otherwise render signup page 
  res.render('signup');
});

// export module 
module.exports = router;
