var express = require('express');
var router = express.Router();

router.use('/services', require('./services')());
router.use('/user', require('./user')());
router.use('/employees', require('./employees')());
router.use('/positions', require('./positions'));
router.use('/cars', require('./cars'));

module.exports = router;
