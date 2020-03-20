const express = require('express');
const db = require('./postDb.js');

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  db.get()
    .then(post => {
        res.status(200).json({post});
    })
    .catch(err => {
    res.status(500).json({success:false, err: 'The posts information could not be retrieved.'});
    });
});

router.get('/:id', (req, res) => {
  // do your magic!
  db.getById(req.params.id)
    .then(post => {
      if(!post) {
        res.status(404).json({message: 'Post doesn\'t exist!'})
      } else {
        res.status(200).json(post);
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: 'Problem retrieving post.'
      })
    })
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
