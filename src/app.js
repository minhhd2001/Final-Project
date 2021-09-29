require('dotenv').config();
const express = require('express');
const db = require('./config/db');
const route = require('./route');
const methodOverride = require('method-override');
const app = express();
const path = require('path');
const hbs = require('hbs')

app.use(express.json());
app.use(express.urlencoded({ extended: true })) 
app.set('view engine', 'hbs');
app.use(express.static('../public'))
app.use(methodOverride('_method'))

app.set('views', path.join(__dirname, 'views'))
hbs.registerHelper("sum", (count) =>{
    return count + 1;
})

const run = async ()=>{
    await db.connect();
    app.use('/', route)
}


run();

app.listen(process.env.PORT || 3000, ()=> console.log('Server is running !'));