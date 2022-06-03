const express = require('express');

const app = express();

app.use('/', (req, res) => {
    res.send('hello');
})

app.listen(8080, () => {
    console.log('server is running at port 8080');
})