const { Label, Sample } = require('../models/models');

const translate = async (req, res) => {
    try {
        let newLabelData = req.body;
        let newLabel = new Label({
            title: newLabelData.title,
            description: newLabelData.description,
            status: newLabelData.status
        });
        let resData = newLabel.dataValues;
        await newLabel.save();
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
const reverseTranslate = async (req, res) => {
    try {
        let sentence = req.body.text;
        console.log(sentence);
        let resu = [];
        let words = sentence.split(' ');
        let labels = await Label.findAll({ raw: true });
        for (let i = 0; i < words.length; i++) {
            console.log(words[i] + '-----');
            for (let j = 0; j < labels.length; j++) {
                console.log(labels[j].title);
                if (words[i] == labels[j].title) {
                    let samples = await Sample.findAll({
                        where: {
                            labelId: labels[j].id
                        },
                        raw: true
                    });
                    console.log(samples);
                    let random = Math.floor(Math.random() * samples.length);
                    resu.push(samples[random].path);
                    break;
                }
            }
        }
        console.log(resu);
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: resu == '' ? 'Khong co trong csdl' : resu
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};

module.exports = {
    translate,
    reverseTranslate
};
