const taskSchema = require("../models/todo");

//add task
const addTask = async (req, res) => {

  try {
    const taskName = req.body;
    const email = req.session.user.email;
    const user = await taskSchema.findOne({ email });

    user.tasks.push(taskName);

    await user.save();

    return res.send({ success: true, message: "Task added successfully" });
  } catch (error) {
    return res.send({ success: false, message: "Something went wrong" });
  }
};

//update task
const editTask = async (req, res) => {
  try {
    const user = req.session.user.email;
    const index = req.params.id;
    const taskName = req.body.taskName;

    const findUser = await taskSchema.findOne({ email: user });

    findUser.tasks[index].taskName = taskName;

    await findUser.save();

    return res.send({ success: true, message: "Task edited successfully" });
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (req, res) => {
  try {
    const email = req.session.user.email;
    const index = req.params.id;

    const user = await taskSchema.findOne({ email });

    user.tasks.splice(index, 1);

    user.save();

    res.status(200).json({ message: "Task deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const updateTask = async (req, res) => {
  try {
    const index = req.params.id;
    const email = req.session.user.email;
    const completed = req.body.completed;
    const user = await taskSchema.findOne({ email });

    user.tasks[index].completed = completed;

    user.save();

    res.status(200).json({ message: "Task updated successfully!" });
  } catch (error) {}
};

module.exports = {
  addTask,
  editTask,
  deleteTask,
  updateTask,
};
