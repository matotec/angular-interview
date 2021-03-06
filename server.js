const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/angular-interview'));
app.get('/*',function(req,res){
    res.sendFile('index.html',{root : __dirname +'/dist/angular-interview/'});
});

app.listen(process.env.PORT || 8080);