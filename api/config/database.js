//Set up mongoose connection
const mongoose = require('mongoose');
require('dotenv').config();

const mongoDB = process.env.DB_NAME;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
module.exports = mongoose;