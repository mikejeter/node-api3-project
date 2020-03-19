const express = require('express');
const db = require('./userDb.js');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  const { name } = req.body;

    db.insert(req.body)
        .then(user => {
            if (!name) {
                res.status(400).json({ message: 'Please provide title and contents for the post.'});
            } else {
                res.status(201).json(user);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ err: 'There was an error while saving the post to the database'});
        });
});

router.post('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  const userInfo = { ...req.body, user_id: req.params.id };

  db.insert(userInfo)
    
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'Error adding post.' });
    });
});

router.get('/', (req, res) => {
  // do your magic!
  db.get()
    .then(user => {
        res.status(200).json({user});
    })
    .catch(err => {
    res.status(500).json({success:false, err: 'The posts information could not be retrieved.'});
    });
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  db.getById(req.params.id) 
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving user!'});
    });
});

router.get('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  db.getUserPosts(req.params.id) 
    .then(posts => {
      if(posts.length === 0) {
        res.status(400).json({ message: 'User has no posts!' });
      } else {
        res.status(200).json(posts);
      }
    });
    
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  db.remove(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'Error removing user.' });
    });
});

router.put('/:id', (req, res) => {
  // do your magic!
  db.update(req.params.id, req.body)
    .then(updated => {
      if(!updated) {
        res.status(404).json({ message: 'User could not be found!' });
      } else {
        res.status(200).json(updated);
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'Error updating user.' });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  db.getById(req.params.id)
    .then(user => {
      if(!user) {
        res.status(400).json({ message: 'Invalid user ID.'});
      } else {
        req.user = user;
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving posts.' });
    });
}

function validateUser(req, res, next) {
  // do your magic!
  if(!req.body) {
    res.status(400).json({ message: "missing user data" });
  } else if(!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    res.status(201).json(req.body);
  }
  next();
}

function validatePost(req, res, next) {
  // do your magic!
  if(!req.body) {
    res.status(400).json({ message: "missing post data" });
  } else if(!req.body.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    res.status(201).json(req.body);
  }
  next();
}

module.exports = router;
