const { Data } = require('../models/models');
const uploadFile = require('./uploadFileMiddleware');

const addNewData = async (req, res) => {
    try {
        await uploadFile(req, res);
        if (req.file == undefined) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Upload a file please!'
            });
        }
        let data = req.body;
        data.path = req.file.filename;
        data.status = 'pending';
        let newData = new Data({
            path: data.path,
            status: data.status,
            userId: data.userId
        });
        let resData = newData.dataValues;
        await newData.save();
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
const updateDataById = async (req, res) => {
    try {
        let data = req.body;
        data.status = 'fullfill';
        await Data.update(
            {
                status: data.status,
                content: data.content
            },
            {
                where: {
                    id: req.params.dataId
                },
                raw: true
            }
        );
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
const getAllDataByUserId = async (req, res) => {
    try {
        let datas = await Data.findAll({
            where: {
                userId: req.params.userId
            },
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: datas
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getDataById = async (req, res) => {
    try {
        let data = await Data.findOne({
            where: {
                id: req.params.dataId
            },
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: data
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};

module.exports = {
    addNewData,
    getAllDataByUserId,
    getDataById,
    updateDataById
};
