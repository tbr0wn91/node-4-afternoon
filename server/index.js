const express = require('express');
const session = require("express-session");
const app = express();
require('dotenv').config();
app.use(express.json());
const {SERVER_PORT, SESSION_SECRET} = process.env;
const checkForSession = require('./middlewares/checkForSession'); 
const swagController = require('./controllers/swagController');
const authController = require('./controllers/authController');
const cartController = require('./controllers/cartController');
const searchController = require('./controllers/searchController');


app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUnintialized: true,
        
    })
    );
    
    app.use(checkForSession);
    app.get('/api/swag', swagController.read);

    // endpoints for user registration, login, logout
    app.post('/api/login', authController.login);

    app.post('/api/register', authController.register);

    app.post('/api/signout', authController.signout);

    app.get('/api/user', authController.getUser);

    // endpoints for cart

    app.post('/api/cart/checkout', cartController.checkout);

    app.post('/api/cart/:id', cartController.add);

    app.delete('/api/cart/:id', cartController.delete);

    




// endpoint for search
app.get('/api/search', searchController.search);










app.listen(SERVER_PORT, () => console.log(`Riding the wave of port ${SERVER_PORT}`))