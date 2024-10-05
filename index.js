const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 9001;
const routes = require('./src/routes');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Connect to DB
const db = require('./src/config/db');
db.connect();

// Use cookies
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const allowedOrigins = [
    'http://localhost:9000',
    'https://products-management-demo-seven.vercel.app',
    'https://products-management-demo.vercel.app',
];
app.use(
    cors({
        origin: function (origin, callback) {
            if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    }),
);

// Handle middleware
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(bodyParser.json());

// HTTP logger
app.use(morgan('combined'));

// routes init
routes(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
