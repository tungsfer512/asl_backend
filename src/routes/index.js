// const authRouter = require('./authRouter');
const dataLabelRouter = require('./datalabelRouter');
const dataRouter = require('./dataRouter');
const labelRouter = require('./labelRouter');
const modelRouter = require('./modelRouter');
const sampleRouter = require('./sampleRouter');
const translateRouter = require('./translateRouter');
const userRouter = require('./userRouter');

const initWebRouter = (app) => {
    // app.use('/api/auth', authRouter);
    app.use('/api/datas', dataRouter);
    app.use('/api/datalabels', dataLabelRouter);
    app.use('/api/labels', labelRouter);
    app.use('/api/models', modelRouter);
    app.use('/api/samples', sampleRouter);
    app.use('/api/translates', translateRouter);
    app.use('/api/users', userRouter);
};

module.exports = initWebRouter;
