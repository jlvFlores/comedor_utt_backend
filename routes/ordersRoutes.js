const OrdersController = require('../controllers/ordersController');
const passport = require('passport');

module.exports = (app) => {

    // GET ROUTES
    app.get('/api/orders/findByStatus/:status', passport.authenticate('jwt', {session: false}), OrdersController.findByStatus);
    app.get('/api/orders/findByClientAndStatus/:id_client/:status', passport.authenticate('jwt', {session: false}), OrdersController.findByClientAndStatus);

    // POST ROUTES
    app.post('/api/orders/create', passport.authenticate('jwt', {session: false}), OrdersController.create);
    
    // BORRAR DATOS
    app.post('/api/orders/delete/:id', OrdersController.delete);

    // PUT ROUTES
    app.put('/api/orders/updateToDelivered', passport.authenticate('jwt', {session: false}), OrdersController.updateToDelivered);
}