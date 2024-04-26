const fs = require("fs");
const express = require("express");
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Olá, mundo!');
});


app.listen(45678, () => {
    console.log("Api rodando!");
});