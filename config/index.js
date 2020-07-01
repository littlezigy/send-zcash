let config;

console.log('Environment:', process.env.NODE_ENV);

switch(process.env.NODE_ENV) {
    case 'production':
        config = require('./env/production');
        break;
    case 'development':
        config = require('./env/development');
        break;
    case 'staging':
        config = require('./env/staging');
        break;
    case 'test':
        config = require('./env/test');
        break;
}

module.exports = config;
