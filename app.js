let express = require('express');
let app = express();
const config = require('./config');

// Requests
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('public'));

// Security
const cors = require('cors');
app.use(cors(config.cors));
const helmet = require('helmet');
app.use(helmet());

const router = require('./config/routes');
app.use(router);

const database = require('postgresorm');
database.initializeDatabase(config.database.connection);

const cron = require('node-cron');

module.exports = app;
