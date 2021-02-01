const express = require('express');
let dotenv = require('dotenv');
let app = express();
dotenv.config();
app.use(express.static('public'));

app.get('/',function(req,res){
    res.sendFile('index.html');
    console.log("works")
});

app.listen(process.env.PORT);