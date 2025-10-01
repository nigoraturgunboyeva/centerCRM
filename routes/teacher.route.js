const Router = require("express")
const router = new Router()
const teacherController = require("../controllers/teacher.controller")

router.post("/add-teacher", teacherController.addTeacher)
router.post("/signUp", teacherController.signUp)
router.post("/signIn", teacherController.signIn)
router.get("/get-all-teachers", teacherController.getAllTeachers)
router.get("/get-one-teacher/:id", teacherController.getOneTeacher)
router.put("/update-teacher/", teacherController.updateTeacher)
router.delete("/delete-teacher/:id", teacherController.deleteTeacher)
module.exports = router