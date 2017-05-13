var express = require('express');
var router = express.Router();
const controllers = require('../controllers/posting');

router.get('/', controllers.getAll)
router.post('/', controllers.posting)

module.exports = router;