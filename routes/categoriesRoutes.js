const CategoriesController = require('../controllers/categoriesController');
const passport = require('passport');

module.exports = (app) => {

    // TRAER DATOS
   app.get('/api/categories/getAll', passport.authenticate('jwt', {session: false}), CategoriesController.getAll);

    // GUARDAR DATOS
   app.post('/api/categories/create', passport.authenticate('jwt', {session: false}), CategoriesController.create);
}