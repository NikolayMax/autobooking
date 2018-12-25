var express = require('express');
var router = express.Router();

router.use('/services', require('./services')());
router.use('/user', require('./user')());
router.use(require('./marks'));
router.use(require('./models'));

module.exports = router;
