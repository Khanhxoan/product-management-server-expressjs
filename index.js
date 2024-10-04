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
app.use(
    cors({
        origin: '*',
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
