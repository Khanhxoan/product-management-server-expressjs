const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 9001;
const routes = require('./src/routes');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Connect to DB
const db = require('./src/config/db');
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
// Handle middleware
app.use(
    express.urlencoded({
        extended: true,
    }),
);
// Middleware để parse JSON
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// HTTP logger
app.use(morgan('combined'));

// routes init
routes(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
