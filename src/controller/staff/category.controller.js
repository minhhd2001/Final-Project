const Categories = require("../../model/categories.model").model;
const Courses = require("../../model/courses.model");

//[GET] /staff/viewCategory/create
const create = (req, res, next) => {
  res.render("staff/categories/createCategory");
};

//[POST] /staff/viewCategory/store
const store = async (req, res, next) => {
  try {
    await new Categories({
      name: req.body.name,
    }).save();
    res.redirect("/staff/viewCategory");
  } catch (err) {
    next(err);
  }
};

//[GET] /staff/viewCategory
const show = async (req, res, next) => {
  try {
    const categories = await Categories.find({})
    res.render("staff/categories/viewCategory", {
      categories: categories,
    });
  }catch (err) {
      next(err);
  }
};

//[GET] /staff/viewCategory/:id/edit
const edit = async (req, res, next) => {
  try{
    const category = await Categories.findOne({ _id: req.params.id })
    res.render("staff/categories/editCategory", {
      category: category,
    });
  }catch(err){
      next(err);
  }
};

//[PUT] /staff/viewCategory/:id
const update = async (req, res, next) => {
  try{
    await Categories.updateOne({ _id: req.params.id }, req.body)
    res.redirect("/staff/viewCategory")
  }catch(err){
      next(err);
  }
};

//[GET] /staff/viewCategory/search
const search = async (req, res, next) => {
  try {
    const category = await Categories.findOne({ name: req.query.search })
    if (category) {
      return res.render("staff/categories/viewCategory", {
        category: category,
      });
    }
    const searchCategory = new RegExp(req.query.search, "i");
    const categories = await Categories.find({ name: searchCategory })
      res.render("staff/categories/viewCategory", {
        categories: categories,
      });
  }catch (err) {
      next(err);
  }
};

//[DELETE] /staff/viewCategory/:id
const destroy = async (req, res, next) => {
  try {
    let courses = await Courses.find({ idCategory: req.params.id })
    if (courses.length) {
      return res.send(
        "A course already exists in this category. Please delete the course first"
      );
    }
    await Categories.deleteOne({ _id: req.params.id })
      res.redirect("/staff/viewCategory");
  }catch (err) {
      next(err);
  }
};

const category = {
  create,
  store,
  show,
  edit,
  update,
  search,
  destroy,
};

module.exports = category;
