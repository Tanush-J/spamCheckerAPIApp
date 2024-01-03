const express = require('express');
const session = require('express-session');
const cors = require('cors');

require('dotenv').config()

const sequelize = require('./connect');
const routes = require('./routes/index');

const app = express();
const port = process.env.PORT || 3000;

app.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

sequelize.sync().then(() => {
    console.log('Database is ready.');

    // Routes
    app.use(cors())
    app.use('/', routes);
    app.get('/', (req, res) => {
        res.send(`
        <h1>List of endpoints</h1>
        <p>POST REQUEST- </p>
        <ul>
        <li> /register - payload in body = {"name": "example","phoneNumber": "7588794481","email": "example@example.com","password": "password1"} </li>
        <li> /login - payload in body = {"phoneNumber": "7588794481","password": "password1"} </li>
        <li> /markspam - payload in body = {"phoneNumber": "7588794481","reporterId": "1"} </li>
        </ul>
        <p> GET REQUEST- </p>
        <ul>
        <li> /search/name - payload in query param - eg. localhost:3000/search/name?query=Tanush Jangid </li>
        <li> /search/phone - payload in query param - eg. localhost:3000/search/phone?phoneNumber=1234567890 </li>
        <li> /userInfo - payload in query param - eg. localhost:3000/userInfo?phoneNumber=3376543210 (here depending on if searcher in contact list or not you see email in response)</li>
        </ul>
        `)
    })

    // Start the server
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});