const taskSchema = require("../models/todo");
const bcrypt = require("bcrypt");

//load login
const loadLogin = (req, res) => {
  res.render("login");
};

//login verification
const loginVerify = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await taskSchema.findOne({ email });

    if (!user) return res.send({ success: false, message: "email not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.send({ success: false, message: "incorrect password" });

    req.session.user = user;

    return res.send({ success: true });
  } catch (error) {}
};

//load register
const loadRegister = (req, res) => {
  res.render("register");
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await taskSchema.findOne({ email });
    if (user) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new taskSchema({
      username,
      password: hashedPassword,
      email,
    });

    await newUser.save();

    req.session.user = newUser;

    res.redirect("/home");
  } catch (error) {}
};

//home page render
const homepage = async (req, res) => {
  if (req.session.user) {
    const userEmail = req.session.user.email;

    const user = await taskSchema.findOne({ email: userEmail });

    res.render("home", { user: req.session.user, tasks: user.tasks });
  } else {
    res.redirect("/login");
  }
};

module.exports = {
  homepage,
  loadLogin,
  loadRegister,
  registerUser,
  loginVerify,
};
