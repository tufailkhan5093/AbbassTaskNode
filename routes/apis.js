const express = require('express');
const router = express();
const multer = require('multer');
const path = require('path');
const globalController = require('../controllers/globalController');
const asyncMiddleware = require('../middlewares/async');
const { validateToken } = require('../middlewares/validateToken');


//BOOKING
router.post('/AddNewUser', asyncMiddleware(globalController.AddNewUser));
router.post('/AddNewList', asyncMiddleware(globalController.AddNewList));


module.exports = router;