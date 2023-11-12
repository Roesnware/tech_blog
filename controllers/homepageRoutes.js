// import modules 
const router = require('express').Router();
const { BlogPost, User } = require('../models');
const withAuth = require('../utils/auth');

// get request to homepage
router.get('/', async (req, res) => {
  console.log(req.session.user_id);
  console.log(req.session.logged_in);

  try { // try 
    // get all blogPosts 
    const allBlogPost = await BlogPost.findAll({
      include: [User],
    });

    // serialize blogPosts so the template can read it
    const blogPost = allBlogPost.map((post) => post.get({ plain: true }));

    // pass serialized blogPosts and session flag into template
    res.render('homepage', {
      blogPost,
      logged_in: req.session.logged_in,
    });
  } catch (err) { // catch err
    res.status(500).json(err);
  }
});

// get request to dashboard withAuth middleware to prevent access to route if not logged in
router.get('/dashboard', withAuth, async (req, res) => {
  console.log(req.session.user_id);
  console.log(req.session.logged_in);

  try { // try
    // get all post by user 
    const allUserPost = await BlogPost.findAll(
      {
        where: {
          user_id: req.session.user_id,
        }
      });

    // no post found by user 
    if (!allUserPost) {
      console.log("No Post found by this user!");
    }

    // serialize psot 
    const userPost = allUserPost.map((post) => post.get({ plain: true }));

    // render dashboard with post 
    res.render('dashboard', {
      userPost,
      logged_in: res.session.logged_in,
    });

  } catch (err) { // catch err
    res.status(500).json(err);
  }
});

// get request to login 
router.get('/login', (req, res) => {
  // user already logged in redirect to homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  // otherwise render login page 
  res.render('login');
});

// get request to login 
router.get('/signup', (req, res) => {
  // user already logged in redirect to homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  // otherwise render signup page 
  res.render('signup');
});

// export module 
module.exports = router;
