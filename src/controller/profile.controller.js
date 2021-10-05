const users = require("../model/users.model");
const bcrypt = require("bcryptjs");
const User = users.model;

const show = async (req, res, next) => {
  let user;
  await User.findOne({ _id: req.id }).then(function (result) {
    if (!result) return res.send(401);
    user = {
      email: result.email,
      name: result.name,
      age: result.age,
      avatar: result.avatar,
      phone: result.phone,
      address: result.address,
      role: result.role,
    };
  });
  res.render("profile/index", {
    user,
    rolePage: req.rolePage,
    link: `/${req.role}`,
    avatar: req.avatar,
    email: req.email
  });
};

const changePassword = async (req, res, next) => {
  const userPassword = await User.findOne({ _id: req.id })
    .then((user) => {
      return user.password;
    })
    .catch(next);
  if (!userPassword) return res.send(401);
  if (!bcrypt.compareSync(req.body.password, userPassword))
    return res.send("Password wrong !");
  const salt = bcrypt.genSaltSync(10);
  let passwordHash = bcrypt.hashSync(req.body.newPassword, salt);
  await User.updateOne({ _id: req.id }, { password: passwordHash })
    .then(() => {
      return res.send('Change successfully !');
    })
    .catch(next);
};

const profile = {
  show,
  changePassword
}

module.exports = profile;
