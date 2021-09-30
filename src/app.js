const express = require('express');
const db = require('./config/db');
const route = require('./route');
const methodOverride = require('method-override');
const path = require('path');
const app = express();
const hbs = require('hbs')
const session = require('express-session')

app.use(express.json());
app.use(express.urlencoded({ extended: true })) 
app.set('view engine', 'hbs');
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.set('views', path.join(__dirname, 'views'))

hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper("sum", (count) =>{
    return count + 1;
})
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: 'Group5', 

}))
const run = async ()=>{
    await db.connect();
    app.use('/', route)
}

run();

app.listen(3000, ()=> console.log('Server is running !'));