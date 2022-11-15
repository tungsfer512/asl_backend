const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/connectDB');
const initWebRouter = require('./routes');
const configResources = require('./config/resources');

dotenv.config();
let app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configResources(app);
initWebRouter(app);
connectDB();

let PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('running on port: ' + PORT);
});
