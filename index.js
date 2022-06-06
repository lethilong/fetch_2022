const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const connectDatabase = require('./database');

const authRoute = require('./routes/authRoute');

const app = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());
connectDatabase();

app.use('/api/auth', authRoute);

app.listen(8080, () => {
    console.log('server is running at port 8080');
})