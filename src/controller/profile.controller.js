const users = require("../model/users.model");
const bcrypt = require("bcryptjs");
const User = users.model;

const show = async (req, res, next) => {
  let user;
  await User.findOne({ _id: 2 }).then(function (result) {
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
  res.render("index", { user });
};

const changePassword = async (req, res, next) => {
  const userPassword = await User.findOne({ _id: 2 })
    .then((user) => {
      return user.password;
    })
    .catch(next);
  if (!userPassword) return res.send(401);
  if (!bcrypt.compareSync(req.body.password, userPassword))
    return res.send("Password wrong !");
    const salt = bcrypt.genSaltSync(10);
    let passwordHash = bcrypt.hashSync(req.body.newPassword, salt);
    await User.updateOne({ _id: 2}, { password: passwordHash })
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
