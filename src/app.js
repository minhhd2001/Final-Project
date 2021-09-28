require('dotenv').config();
const express = require('express');
const db = require('./config/db');
const route = require('./route');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })) 
app.set('view engine', 'hbs');
app.use(express.static('../public'))



const run = async ()=>{
    await db.connect();
    app.use('/', route)
}

run();

app.listen(process.env.PORT || 3000, ()=> console.log('Server is running !'));