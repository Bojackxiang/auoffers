var log4js = require('log4js');
log4js.configure({
    appenders: {
        info: {
            type: 'file',
            // filename: './logs/info.log',
            filename: 'info.log',
        },
        error: {
            type: 'file',
            // filename: './logs/error.log',
            filename: 'error.log',
        }
    },
    categories: {
        default: {
            appenders: ['error'],
            level: 'info'
        },
    }
});


module.exports = {
    info: log4js.getLogger('info'),
    error: log4js.getLogger('error'),
}