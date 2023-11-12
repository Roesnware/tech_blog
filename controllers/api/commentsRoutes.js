// import modules 
const router = require('express').Router();
const { User, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

// get route to get all comments with game 
router.get('/', async (req, res) => {

  try { // try 
    // get all comments include user 
    const allComments = await Comments.findAll(
      {
        include: [{ model: User }]
      })

    // no comments found 
    if (!allComments) {
      res.status(400).json({ message: "No Comments found!" });
    }

    // success
    res.status(200).json(allComments);
  }
  catch (err) { // catch err
    res.status(400).json(err);
  }
});

// get route to get comments by id 
router.get('/:id', async (req, res) => {

  try { // try 
    // get comments with id include game 
    const commentsById = await Comments.findByPk(req.params.id, {
      include: [{ model: User }]
    });

    // no comments found 
    if (!commentsById) {
      res.status(400).json({ message: "No comments found with that id!" });
    }

    // success
    res.status(200).json(commentsById);
  }
  catch (err) { // catch err
    res.status(500).json(err);
  }
});

// comment route to comment a new comments
router.post('/', withAuth, async (req, res) => {
  try { // try 
    // create new comments using body of request 
    const newComments = await Comments.create(
      {
        content: req.body.content,
        blogpost_id: req.body.blogpost_id,
        user_id: req.session.user_id,
      });

    // no comments created 
    if (!newComments) {
      res.status(400).json({ message: "Error creating Comments!" });
    }

    // success
    res.status(200).json(newComments);
  } catch (err) { // catch err
    res.status(500).json(err);
  }
});

// comment route to update comments 
router.post('/:id', withAuth, async (req, res) => {
  try { // try 
    // update psot using body of request  
    const updateThisComment = await Comments.update(
      {
        content: req.body.content
      },
      {
        where: {
          id: req.params.id,
        },
      });

    // no comment created 
    if (!updateThisComment) {
      res.status(400).json({ message: "Error updating comment!" });
    }

    // success
    res.status(200).json(updateThisComment);
  } catch (err) { // catch err
    res.status(500).json(err);
  }
});

// delete route to delete comments 
router.delete('/:id', withAuth, async (req, res) => {
  try { // try
    // try to search comment by id form req 
    const commentsData = await Comments.destroy(
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });

    // no comment found with id
    if (!commentsData) {
      res.status(404).json({ message: 'No Comments found with this id!' });
      return;
    }

    // success
    res.status(200).json(commentsData);
  } catch (err) { // catch err
    res.status(500).json(err);
  }
});

// export module
module.exports = router;
