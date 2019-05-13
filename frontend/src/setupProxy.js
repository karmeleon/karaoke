const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    console.log('sup');
    app.use(proxy('/api', { target: 'http://localhost:9000/' }));
};
