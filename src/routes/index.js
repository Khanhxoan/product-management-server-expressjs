const productRouter = require('./product-routes');
const authRouter = require('./auth-routes');

function routes(app) {
    app.use('/auth', authRouter);
    app.use('/products', productRouter);
}

module.exports = routes;
