require('dotenv').config();
const express = require('express');
const db = require('./config/db');
const auth = require('./controller/auth.controller')
// const route = require('./route');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extension: true}));

const run = async ()=>{
    db.connect();
    app.get('/', auth)
}

run();

app.listen(process.env.PORT || 3000, ()=> console.log('Server is running !'));