var express = require('express');
var router = express.Router();

router.use('/services', require('./services')());
router.use('/user', require('./user'));
router.use('/employees', require('./employees')());
router.use('/positions', require('./positions'));
router.use('/cars', require('./cars'));
router.use('/services-models', require('./services-models'));
router.use('/services-employees', require('./services-employees'));
router.use('/visit', require('./visit'));
router.use('/booking', require('./booking'));

module.exports = router;
