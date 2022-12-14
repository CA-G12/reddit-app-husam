const router = require('express').Router();
const Controllers = require('../controllers');
const Middelwares = require('../middleware');

router.get('/allPost', Controllers.allPost);
router.post('/adduser', Controllers.signup, Middelwares.hashPassword);
router.post('/login', Middelwares.checkPassword);
router.get('/checklogged', Controllers.checkLoggedUser);
router.get('/logout', Controllers.logout);
router.post('/addPost', Controllers.addPost);
router.delete('/deletePost', Controllers.deletePost);
router.get('/myPost', Controllers.myPost);
router.put('/updateUserInfo', Controllers.update);
router.post('/voteUp', Controllers.voteUp);
module.exports = router;
