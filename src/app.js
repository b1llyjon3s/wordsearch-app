const express = requires('express');
let dotenv = require('dotenv');
let app = express();

app.use(express.static('public'));

app.get('/',function(req,res){
    res.sendFile('./public/index.html');
});

app.listen(process.env.PORT);