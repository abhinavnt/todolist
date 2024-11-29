const router = require("express").Router()
const userController=require("../controllers/userController")
const taskController=require("../controllers/taskController")
const middleWare=require("../middlewares/userAuth")

//login
router.get("/login",middleWare.checkUser,userController.loadLogin)
router.post("/login",userController.loginVerify)

//signup
router.get("/signUp",middleWare.checkUser,middleWare.checkUser,userController.loadRegister)
router.post("/signUp",middleWare.checkUser,userController.registerUser)

//home page
router.get("/home",userController.homepage)

//task managing
router.post('/addTask',taskController.addTask)
router.post('/edit-task/:id',taskController.editTask)
router.post('/delete-task/:id',taskController.deleteTask)
router.post('/update-task/:id',taskController.updateTask)


module.exports=router