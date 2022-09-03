const router = require('express').Router();
const Controllers = require('../controllers');
const Middelwares = require('../middleware');

router.get('/post', Controllers.allPost);
router.get('/user', Controllers.alluser);
router.post('/adduser', Controllers.signup, Middelwares.hashPassword);
router.post('/login', Middelwares.checkPassword);

module.exports = router;
