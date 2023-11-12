// import modules 
const router = require('express').Router();
const { BlogPost, User, Comments } = require('../models');
const withAuth = require('../utils/auth');

// get request to homepage
router.get('/:id', async (req, res) => {
  try { // try 
    // get this blogPosts 
    const thisBlogPost = await BlogPost.findByPk(req.params.id, {
      include: [User],
    });

    // serialize blogPosts so the template can read it
    const blogPosts = thisBlogPost.get({ plain: true });

    // get commetns for this post 
    const commentsForPost = await Comments.findAll({
        include: [User],
        where: {
            blogpost_id: req.params.id,
        }
    });

    // serialize comments 
    const comments = commentsForPost.map((review) => review.get({ plain: true }));

    // pass serialized blogPosts and session flag into template
    res.render('blogpost', {
      blogPosts,
      comments,
      logged_in: req.session.logged_in,
    });
  } catch (err) { // catch err
    res.status(500).json(err);
  }
});

// export module 
module.exports = router;
