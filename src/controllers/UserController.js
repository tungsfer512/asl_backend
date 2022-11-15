const { User } = require('../models/models');

// Create
const addNewUser = async (req, res) => {
    try {
        let newUserData = req.body;
        let newUser = new User({
            username: newUserData.username,
            password: newUserData.password,
            email: newUserData.email,
            firstName: newUserData.firstName,
            lastName: newUserData.lastName,
            gender: newUserData.gender,
            dob: newUserData.dob,
            role: 'user'
        });
        let resData = newUser.dataValues;
        await newUser.save();
        delete resData.password;
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: resData
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Delete
const deleteUserById = async (req, res) => {
    try {
        let user = await User.findOne({
            where: {
                id: req.params.userId
            },
            raw: true
        });
        await User.destroy({
            where: {
                id: req.params.userId
            },
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: user
        });
    } catch (err) {
        res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Update
const updateUserById = async (req, res) => {
    try {
        let newUserData = req.body;
        await User.update(
            {
                password: newUserData.password,
                firstName: newUserData.firstName,
                lastName: newUserData.lastName,
                gender: newUserData.gender,
                dob: newUserData.dob
            },
            {
                where: {
                    id: req.params.userId
                },
                raw: true
            }
        );
        let resData = await User.findOne({
            where: {
                id: req.params.userId
            },
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: resData
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Read
const getAllUser = async (req, res) => {
    try {
        let users = await User.findAll({
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: users
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getUserById = async (req, res) => {
    try {
        let user = await User.findOne({
            where: {
                id: req.params.userId
            },
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: user
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};

module.exports = {
    addNewUser,
    deleteUserById,
    updateUserById,
    getAllUser,
    getUserById
};
