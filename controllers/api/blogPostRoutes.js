// import modules 
const router = require('express').Router();
const { BlogPost, User, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

// get route to get all blog post with game 
router.get('/', async (req, res) => {

  try { // try 
    // get all blog post include user 
    const allBlogPost = await BlogPost.findAll(
      {
        include: [{ model: Comments }, { model: User }]
      })

    // no blog post found 
    if (!allBlogPost) {
      res.status(400).json({ message: "No Blog Post found!" });
    }

    // success
    res.status(200).json(allBlogPost);
  }
  catch (err) { // catch err
    res.status(400).json(err);
  }
});

// get route to get blog post by id 
router.get('/:id', async (req, res) => {

  try { // try 
    // get blog post with id include game 
    const blogPostById = await BlogPost.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comments }]
    });

    // no blog post found 
    if (!blogPostById) {
      res.status(400).json({ message: "No blog post found with that id!" });
    }

    // success
    res.status(200).json(blogPostById);
  }
  catch (err) { // catch err
    res.status(500).json(err);
  }
});

// post route to post a new blog post
router.post('/', withAuth, async (req, res) => {
  try { // try 
    // create new blog post using body of request 
    const newBlogPost = await BlogPost.create(
      {
        content: req.body.content,
        user_id: req.session.user_id,
      });

    // no blog post created 
    if (!newBlogPost) {
      res.status(400).json({ message: "Error creating Blog Post!" });
    }

    // success
    res.status(200).json(newBlogPost);
  } catch (err) { // catch err
    res.status(500).json(err);
  }
});

// post route to update blog post 
router.post('/:id', withAuth, async (req, res) => {
  try { // try 
    // update psot using body of request  
    const updateThisPost = await BlogPost.update(
      {
        content: req.body.content
      },
      {
        where: {
          id: req.params.id,
        },
      });

    // no post created 
    if (!updateThisPost) {
      res.status(400).json({ message: "Error updating post!" });
    }

    // success
    res.status(200).json(updateThisPost);
  } catch (err) { // catch err
    res.status(500).json(err);
  }
});

// delete route to delete blog post 
router.delete('/:id', withAuth, async (req, res) => {
  try { // try
    // try to search post by id form req 
    const blogPostData = await BlogPost.destroy(
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });

    // no post found with id
    if (!blogPostData) {
      res.status(404).json({ message: 'No Blog Post found with this id!' });
      return;
    }

    // success
    res.status(200).json(blogPostData);
  } catch (err) { // catch err
    res.status(500).json(err);
  }
});

// export module
module.exports = router;
