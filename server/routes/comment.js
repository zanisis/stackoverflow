var express = require('express');
var router = express.Router();
const controllers = require('../controllers/comment');

// router.post('/', controllers.comment)
router.post('/:id', controllers.comment)
router.put('/:id', controllers.commentUpdate)
router.delete('/:id', controllers.commentDelete)

module.exports = router;