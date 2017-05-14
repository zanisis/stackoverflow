var express = require('express');
var router = express.Router();
const controllers = require('../controllers/posting');

router.get('/', controllers.getAll)
router.post('/', controllers.posting)
router.put('/:id', controllers.updatePost)
router.delete('/:id', controllers.delete)

module.exports = router;