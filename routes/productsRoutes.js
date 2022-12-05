const ProductsController = require('../controllers/productsController');
const passport = require('passport');

module.exports = (app, upload) => {

    // TRAER DATOS
    app.get('/api/products/findByCategory/:id_category', passport.authenticate('jwt', {session: false}), ProductsController.findByCategory);
    app.get('/api/products/findByCategoryAndProductName/:id_category/:product_name', passport.authenticate('jwt', {session: false}), ProductsController.findByCategoryAndProductName);

    // GUARDAR DATOS
    app.post('/api/products/create', passport.authenticate('jwt', {session: false}), upload.array('image', 1), ProductsController.create);
}