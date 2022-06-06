const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const connectDatabase = require('./database');

const authRoute = require('./routes/authRoute');
const taskRoute = require('./routes/taskRoute'); 

const app = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());
connectDatabase();

app.use('/api/auth', authRoute);
app.use('/api/tasks', taskRoute);

app.listen(8080, () => {
    console.log('server is running at port 8080');
})