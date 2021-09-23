const mongoose = require('mongoose');
const role = require('../model/roles.model');
const category = require('../model/categories.model');
const user = require('../model/users.model');
// const course = require('../model/courses.model');
async function connect() {
    try {
        await mongoose.connect(`mongodb+srv://group5:group5@cluster0.4caia.mongodb.net/group5?retryWrites=true&w=majority`);
        console.log('Connected successful !');
        role.initialize;
        category.initialize;
        user.initialize;
        // course.initialize;
    }
    catch(err) {
        console.log('Connect failed: ' + err);
    }
}

module.exports = {connect};