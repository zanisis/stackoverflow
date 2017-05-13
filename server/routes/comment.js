var express = require('express');
var router = express.Router();
const controllers = require('../controllers/comment');

// router.post('/', controllers.comment)
router.post('/:id', controllers.comment)

module.exports = router;