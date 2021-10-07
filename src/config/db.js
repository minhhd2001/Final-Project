const mongoose = require('mongoose');
const role = require('../model/roles.model');
const category = require('../model/categories.model');
const user = require('../model/users.model');
// const course = require('../model/courses.model');
async function connect() {
    try {
        // mongodb+srv://group5:group5@cluster0.4caia.mongodb.net/group5?retryWrites=true&w=majority
        // await mongoose.connect(`mongodb:${process.env.DB_HOST}/${process.env.DB_NAME}`);
        // await mongoose.connect('mongodb://localhost:27017/group5_project_application_development');
        // await mongoose.connect('mongodb://localhost:27017/Web');
        // await mongoose.connect(`mongodb+srv://admin:admin@cluster0.ewlyy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
        //await mongoose.connect('mongodb://localhost:27017/group5_project_application_development');
        //await mongoose.connect('mongodb://localhost:27017/Web');
        console.log('Connected successful !');
        await role.initialize;
        await category.initialize;
        await user.initialize;
        // course.initialize;
    }
    catch(err) {
        console.log('Connect failed: ' + err);
    }
}

module.exports = {connect};