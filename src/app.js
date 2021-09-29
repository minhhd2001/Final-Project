const express = require('express');
const db = require('./config/db');
const route = require('./route');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })) 
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.static('public'))



const run = async ()=>{
    await db.connect();
    app.use('/', route)
}


run();

app.listen(3000, ()=> console.log('Server is running !'));