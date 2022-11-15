const express = require('express');

const LabelController = require('../controllers/LabelController');

let labelRouter = express.Router();

labelRouter.post('/add', LabelController.addNewLabel);
labelRouter.delete('/delete/:labelId', LabelController.deleteLabelById);
labelRouter.put('/update/:labelId', LabelController.updateLabelById);
labelRouter.get('/:userId', LabelController.getLabelById);
labelRouter.get('/', LabelController.getAllLabel);

module.exports = labelRouter;
