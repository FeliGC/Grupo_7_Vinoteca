const express = require('express');
const path = require('path');
const app = express();

const publicPath = path.resolve(__dirname, './public');
app.use( express.static(publicPath) );

app.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/register.html'));
});

let puerto = process.env.PORT || 3000;
app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto " + puerto)
});

