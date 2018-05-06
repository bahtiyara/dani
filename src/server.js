const express = require('express');
const path = require('path');

const port = process.env.PORT || 3000;
var app = express();
app.use(express.static(__dirname + '/../'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('home.html'));
});
app.get('/new', (req, res) => {
    res.sendFile(path.resolve('new.html'));
});
app.get('/question', (req, res) => {
    res.sendFile(path.resolve('detail.html'));
});

app.listen(port, () => {
    console.log(`The server is up on port ${port}`);
});