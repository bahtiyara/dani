const express = require('express');
const path = require('path');
const {ObjectID} = require('mongodb');

const port = process.env.PORT || 3000;
var app = express();
app.use(express.static(__dirname + '/../'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('home.html'));
});
app.get('/new', (req, res) => {
    res.sendFile(path.resolve('new.html'));
});

// 这个可能会被删了
// app.get('/question', (req, res) => {
//     res.sendFile(path.resolve('detail.html'));
// });

// 用的是这个
app.get('/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    res.sendFile(path.resolve('detail.html'));
});

app.listen(port, () => {
    console.log(`The server is up on port ${port}`);
});