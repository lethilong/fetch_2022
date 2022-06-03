const express = require('express');
const dotenv = require('dotenv');
const connectDatabase = require('./database');

const app = express();

dotenv.config();
connectDatabase();
app.use('/', (req, res) => {
    res.send('hello');
})

app.listen(8080, () => {
    console.log('server is running at port 8080');
})