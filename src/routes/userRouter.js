const express = require('express');

const UserController = require('../controllers/UserController');

let userRouter = express.Router();

userRouter.post('/add', UserController.addNewUser);
userRouter.delete('/delete/:userId', UserController.deleteUserById);
userRouter.put('/update/:userId', UserController.updateUserById);
userRouter.get('/:userId', UserController.getUserById);
userRouter.get('/', UserController.getAllUser);

module.exports = userRouter;
