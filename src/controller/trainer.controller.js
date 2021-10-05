const users = require("../model/users.model");
const categories = require("../model/categories.model");
const Course = require("../model/courses.model");
const Category = categories.model;
const User = users.model;

const update = async (req, res, next) => {
  try {
    const avatar = req.file.filename;
    await User.updateOne(
      { $and: [{ _id: req.id }, { role: "trainer" }] },
      {
        avatar: avatar,
        phone: req.body.phone,
        address: req.body.address,
        age: req.body.age,
        name: req.body.name,
      }
    )
    res.redirect("/profile");
  } catch (err) {
    console.log(err);
  }
};

const showCourses = async (req, res, next) => {
  try {
    const coursesDB = await Course.find({ idTrainer: req.id })
    for (let course of coursesDB) {
      let category = await Category.findOne({ _id: course.idCategory })
      course.category = category.name;
    }
    const courses = coursesDB.map((courseDB) => {
      return {
        id: courseDB.id,
        name: courseDB.name,
        description: courseDB.description,
        category: courseDB.category,
        quantity: courseDB.idTrainee.length,
      };
    });
    const categories = await Category.find({})
    res.render('trainer/showCourses', {
      courses,
      categories,
      rolePage: req.rolePage,
      link: `/${req.role}`,
      avatar: req.avatar,
      email: req.email
    });
  } catch (err) {
    next(err);
  }
};

const showCoursesInCategory = async (req, res, next) => {
  try {
    const idCategory = req.params.idCategory;
    if (!idCategory.match(/^[0-9a-fA-F]{24}$/))
      return res.send("No courses found");
    const coursesDB = await Course.find({
      $and: [{ idTrainer: 2 }, { idCategory }],
    })
    for (let course of coursesDB) {
      let category = await Category.findOne({ _id: course.idCategory })
      course.category = category.name;
    }
    const courses = coursesDB.map((courseDB) => {
      return {
        id: courseDB.id,
        name: courseDB.name,
        description: courseDB.description,
        category: courseDB.category,
        quantity: courseDB.idTrainee.length,
      };
    });
    const categories = await Category.find({})
    res.render('trainer/showCourses', {
      courses,
      idCategory,
      categories,
      rolePage: req.rolePage,
      link: `/${req.role}`,
      avatar: req.avatar,
      email: req.email
    });
  } catch (err) {
    next(err);
  }
};

const showTrainees = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) return res.send("No courses found");
    const courseDB = await Course.findOne({ _id: req.params.id })
    const traineesDB = await User.find({
      $and: [{ _id: { $in: courseDB.idTrainee } }, { role: "trainee" }],
    })
    if (traineesDB.length == 0)
      return res.send("The course has no students yet");
    const trainees = traineesDB.map((traineeDB) => {
      return {
        name: traineeDB.name,
        email: traineeDB.email,
        age: traineeDB.age,
        phone: traineeDB.phone,
      };
    });
    // Gửi id khóa học để phục vụ việc search
    const course = {
      id: courseDB.id,
      name: courseDB.name,
    };
    res.json(trainees);
  } catch (err) {
    next(err);
  }
};

const searchCourses = async (req, res, next) => {
  try {
    let course;
    let courses;
    const courseDB = await Course.findOne({
      $and: [{ idTrainer: req.id }, { name: req.query.name }],
    })
    const categories = await Category.find({})
    if (courseDB) {
      const categoryDB = await Category.findOne({ _id: courseDB.idCategory })
      courseDB.category = categoryDB.name;
      course = {
        id: courseDB.id,
        name: courseDB.name,
        category: courseDB.category,
        description: courseDB.description,
        quantity: courseDB.idTrainee.length,
      };
    } else {
      const searchName = new RegExp(req.query.name, "i");
      const coursesDB = await Course.find({
        $and: [{ idTrainer: req.id }, { name: searchName }],
      })
      for (let course of coursesDB) {
        let categoriesDB = await Category.findOne({ _id: course.idCategory })
        course.category = categoriesDB.name;
      }
      courses = coursesDB.map((courseDB) => {
        return {
          id: courseDB.id,
          name: courseDB.name,
          category: courseDB.category,
          description: courseDB.description,
          quantity: courseDB.idTrainee.length,
        };
      });
    }
    res.render('trainer/showCourses', {
      course,
      courses,
      categories,
      rolePage: req.rolePage,
      link: `/${req.role}`,
      avatar: req.avatar,
      email: req.email
    });;
  } catch (err) {
    next(err);
  }
};

const searchCoursesInCategory = async (req, res, next) => {
  try {
    let courses;
    let course;
    const idCategory = req.params.idCategory;
    if (!idCategory.match(/^[0-9a-fA-F]{24}$/))
      return res.send("No courses found");
    const courseDB = await Course.findOne({
      $and: [
        { idTrainer: req.id },
        { name: req.query.name },
        { idCategory: idCategory },
      ],
    })
    const categories = await Category.find({})
    if (courseDB) {
      const categoryDB = await Category.findOne({ _id: courseDB.idCategory })
      courseDB.category = categoryDB.name;
      course = {
        id: courseDB.id,
        name: courseDB.name,
        category: courseDB.category,
        description: courseDB.description,
        quantity: courseDB.idTrainee.length,
      };
    } else {
      const searchName = new RegExp(req.query.name, "i");
      const coursesDB = await Course.find({
        $and: [
          { idTrainer: req.id },
          { name: searchName },
          { idCategory: idCategory },
        ],
      })
      for (let course of coursesDB) {
        let categoriesDB = await Category.findOne({ _id: course.idCategory })
        course.category = categoriesDB.name;
      }
      courses = coursesDB.map((courseDB) => {
        return {
          id: courseDB.id,
          name: courseDB.name,
          category: courseDB.category,
          description: courseDB.description,
          quantity: courseDB.idTrainee.length,
        };
      });
    }
    res.render('trainer/showCourses', {
      course,
      courses,
      categories,
      idCategory,
      rolePage: req.rolePage,
      link: `/${req.role}`,
      avatar: req.avatar,
      email: req.email
    });;
  } catch (err) {
    next(err);
  }
};

const searchTrainees = async (req, res, next) => {
  try {
    let trainees;
    const id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) return res.send("No courses found");
    const Trainees = await Course.findOne({ _id: id })
    const idTrainees = Trainees.idTrainees;
    if (!isNaN(req.params.search)) {
      const traineeByAgeDB = await User.find({
        $and: [
          { _id: { $in: idTrainees } },
          { role: "trainee" },
          { age: req.params.search },
        ],
      })
      if (traineeByAgeDB.length > 0) {
        trainees = traineeByAgeDB.map((traineeDB) => {
          return {
            name: traineeDB.name,
            email: traineeDB.email,
            age: traineeDB.age,
            phone: traineeDB.phone,
          };
        });
      }
    } else {
      const traineeByNameDB = await User.find({
        $and: [
          { _id: { $in: idTrainees } },
          { role: "trainee" },
          { name: req.params.search },
        ],
      })
      if (traineeByNameDB.length > 0) {
        trainees = traineeByNameDB.map((traineeDB) => {
          return {
            name: traineeDB.name,
            email: traineeDB.email,
            age: traineeDB.age,
            phone: traineeDB.phone,
          };
        });
      } else {
        const searchName = new RegExp(req.params.search, "i");
        const traineeByNameExtendDB = await User.find({
          $and: [
            { _id: { $in: idTrainees } },
            { role: "trainee" },
            { name: searchName },
          ],
        })
        if (traineeByNameExtendDB.length > 0) {
          trainees = traineeByNameExtendDB.map((traineeDB) => {
            return {
              name: traineeDB.name,
              email: traineeDB.email,
              age: traineeDB.age,
              phone: traineeDB.phone,
            };
          });
        }
      }
    }
    res.json(trainees);
  } catch (err) {
    next(err);
  }
};

const trainer = {
  update,
  showCourses,
  showCoursesInCategory,
  showTrainees,
  searchCourses,
  searchCoursesInCategory,
  searchTrainees,
};

module.exports = trainer;
