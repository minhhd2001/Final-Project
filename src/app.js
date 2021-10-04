const express = require('express');
const db = require('./config/db');
const route = require('./route');
const methodOverride = require('method-override');
const path = require('path');
const app = express();
const hbs = require('hbs')

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
hbs.registerHelper("compare",(a, b) => {
    if(String(a) == String(b)){
        return true;
    }
    return false;
})
hbs.registerHelper("match",(a, b) => {
    let c = b.some((b)=>{
        return b == a
    })
    if(c) {
        return false;
    }
    return true;
})

const run = async ()=>{
    await db.connect();
    app.use('/', route)
}

run();

app.listen(3000, ()=> console.log('Server is running !'));