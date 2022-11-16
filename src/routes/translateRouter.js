const express = require('express');

const TranslateController = require('../controllers/TranslateController');

let translateRouter = express.Router();

translateRouter.post('/reverse', TranslateController.reverseTranslate);
translateRouter.post('/', TranslateController.translate);
module.exports = translateRouter;
