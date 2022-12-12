const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const passport = require('passport');


// INICIALIZAR FIREBASE ADMIN
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})


const upload = multer({
    storage: multer.memoryStorage()
})


// RUTAS
const users = require('./routes/usersRoutes');
const categories = require('./routes/categoriesRoutes');
const products = require('./routes/productsRoutes');
const orders = require('./routes/ordersRoutes');

// CONFIGURACIONES DEL SERVIDOR
const ip = '192.168.1.211';
const port = process.env.PORT || 3000;


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.disable('x-powered-by');

app.set('port', port);


// LLAMANDO A LA RUTAS
users(app, upload);
categories(app);
orders(app);
products(app, upload);

server.listen(port, ip || 'localhost', function() {
    console.log('Servidor de NodeJS ' + ip + ':' + port + ' Iniciada...')
});


// ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

module.exports = {
    app: app,
    server: server
}


// 200 - ES UN RESPUESTA EXITOSA
// 404 - SIGNIFICA QUE LA URL NO EXISTE
// 500 - ERROR INTERNO DEL SERVIDOR