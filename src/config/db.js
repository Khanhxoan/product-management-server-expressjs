const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(
            'mongodb+srv://khanhxoan99:9PE5Kz8oTcDnjqBM@kvn-db-development.m0mjm.mongodb.net/',
        );
        console.log('connect successfully');
    } catch (err) {
        console.log('connect fail');
    }
}

module.exports = { connect };
