const Courses = require("../../model/courses.model");
const Categories = require("../../model/categories.model").model;
const Users = require("../../model/users.model").model;

//[GET] /staff/viewCourse
const show = async (req, res, next) => {
  try {
    const countDocumentsDeleted = await Courses.countDocumentsDeleted();
    const courses = await Courses.find({});

    const categories = await Categories.find({});
    res.render("staff/courses/viewCourses", {
      courses: courses,
      categories: categories,
      countDocumentsDeleted,
      rolePage: req.rolePage,
      link: `/${req.role}`,
      avatar: req.avatar,
      email: req.email,
    });
  } catch (err) {
    next(err);
  }
};
//[GET] /staff/viewCourse/create
const create = async (req, res, next) => {
  try {
    const categories = await Categories.find({});
    if (categories.length > 0) {
      return res.render("staff/courses/create", {
        categories: categories,
      });
    }
  } catch (err) {
    next(err);
  }
};
//[POST] /staff/viewCourse/store
const store = async (req, res, next) => {
  try {
    await new Courses(req.body).save();
    res.redirect("/staff/viewCourses");
  } catch (err) {
    next(err);
  }
};

//[GET] /staff/viewCourse/:id/edit
const edit = async (req, res, next) => {
  try {
    const categories = await Categories.find({});
    const course = await Courses.findOne({ _id: req.params.id });
    res.render("staff/courses/edit", {
      categories: categories,
      course: course,
    });
  } catch (err) {
    next(err);
  }
};
//[PUT] /staff/viewCourse/:id
const update = async (req, res, next) => {
  try {
    await Courses.updateOne({ _id: req.params.id }, req.body);
    res.redirect("/staff/viewCourses");
  } catch (err) {
    next(err);
  }
};

//[GET] /staff/viewCourse/search
const search = async (req, res, next) => {
  try {
    const countDocumentsDeleted = await Courses.countDocumentsDeleted();
    const course = await Courses.findOne({ name: req.query.search });
    const categories = await Categories.find({});
    if (course) {
      return res.render("staff/courses/viewCourses", {
        course: course,
        categories: categories,
        countDocumentsDeleted,
        rolePage: req.rolePage,
        link: `/${req.role}`,
        avatar: req.avatar,
        email: req.email,
      });
    }
    const searchCourses = new RegExp(req.query.search, "i");
    const courses = await Courses.find({ name: searchCourses });
    res.render("staff/courses/viewCourses", {
      courses: courses,
      categories: categories,
      countDocumentsDeleted,
      rolePage: req.rolePage,
      link: `/${req.role}`,
      avatar: req.avatar,
      email: req.email,
    });
  } catch (err) {
    next(err);
  }
};
//[DELETE] /staff/viewCourse/:id
const destroy = async (req, res, next) => {
  try {
    await Courses.delete({ _id: req.params.id });
    res.redirect("back");
  } catch (err) {
    next(err);
  }
};
//[GET] /staff/viewCourse/trash/store
const storeTrash = async (req, res, next) => {
  try {
    const courses = await Courses.findDeleted({});
    const categories = await Categories.find({});
    res.render("staff/courses/trash", {
      courses: courses,
      categories: categories,
    });
  } catch (err) {
    next(err);
  }
};

//[PUT] /staff/viewCourse/:id/restore
const restore = async (req, res, next) => {
  try {
    await Courses.restore({ _id: req.params.id });
    res.redirect("back");
  } catch (err) {
    next(err);
  }
};
//[DELETE] /staff/viewCourse/:id/force
const deleteForce = async (req, res, next) => {
  try {
    await Courses.deleteOne({ _id: req.params.id });
    res.redirect("back");
  } catch (err) {
    next(err);
  }
};
//[GET] /staff/viewCourse/:id
const showDetail = async (req, res, next) => {
  try {
    const trainers = await Users.find({ role: "trainer" });
    const trainees = await Users.find({ role: "trainee" });
    const categories = await Categories.find({});
    const course = await Courses.findOne({ _id: req.params.id });
    res.render("staff/courses/detailCourse", {
      trainers,
      trainees,
      course,
      categories,
    });
  } catch (err) {
    next(err);
  }
};
//[POST] /staff/viewCourse/:id/addTrainee
const addTrainee = async (req, res, next) => {
  try{
    await Courses.updateOne(
        { _id: req.params.id },
        { $push: { idTrainee: req.body.traineeIds } }
      );
      res.redirect(`/staff/viewCourses/${req.params.id}`);
  }catch(err){
      next(err);
  }
};
//[GET] /staff/viewCourse/:id/viewAddTrainee
const viewAddTrainee = async (req, res, next) => {
  try{
    const trainees = await Users.find({ role: "trainee" })
    const course = await Courses.findOne({ _id: req.params.id })
      res.render("staff/courses/addTrainee", {
        trainees,
        course,
      });
  }catch(err) {
      next(err);
  }
};
//[DELETE] /staff/viewCourse/:id/deleteTrainee
const deleteTrainee = async (req, res, next) => {
  try{
    await Courses.updateOne(
        { _id: req.params.id },
        { $pull: { idTrainee: req.params.idTrainee } }
      )
    res.redirect("back");
  }catch(err) {
      next(err);
  }
};
//[GET] /staff/viewCourse/:id/viewAddTrainer
const viewAddTrainer = async (req, res, next) => {
 try{
    const trainers = await Users.find({ role: "trainer" })
    const course = await Courses.findOne({ _id: req.params.id })
      res.render("staff/courses/addTrainer", {
        trainers,
        course,
      });
 }catch(err) {
     next(err);
 }
};
//[POST] /staff/viewCourse/:id/addTrainer
const addTrainer = async (req, res, next) => {
  try {
    await Courses.updateOne(
        { _id: req.params.id },
        { idTrainer: req.body.trainerId }
      );
      res.redirect(`/staff/viewCourses/${req.params.id}`);
  }catch(err) {
      next(err);
  }
};
//[DELETE] /staff/viewCourse/:id/deleteTrainer
const deleteTrainer = async (req, res, next) => {
  try{
    await Courses.updateOne({ _id: req.params.id }, { idTrainer: "" })
    res.redirect("back");
  }catch(err){
      next(err);
  }
};

const course = {
  show,
  create,
  store,
  edit,
  update,
  search,
  destroy,
  storeTrash,
  restore,
  deleteForce,
  showDetail,
  addTrainee,
  viewAddTrainee,
  addTrainer,
  viewAddTrainer,
  deleteTrainee,
  deleteTrainer,
};
module.exports = course;
