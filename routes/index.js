const express = require('express');
const bodyParser = require('body-parser');
const authenticateMiddleware = require('../middleware/middleware');

const userController = require('../controllers/user');
const spamDataController = require('../controllers/spamData');
const searchController = require('../controllers/search');

const router = express.Router();

router.use(bodyParser.json());

router.post('/register', userController.userRegister);
router.post('/login', userController.userLogin);
router.post('/markspam', authenticateMiddleware, spamDataController.markAsSpam);

router.get('/search/name', authenticateMiddleware, searchController.searchByName);
router.get('/search/phone', authenticateMiddleware, searchController.searchByPhoneNumber);
router.get('/userInfo', authenticateMiddleware, searchController.sendUserInfo);

module.exports = router;
