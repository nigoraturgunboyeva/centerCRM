const Router = require("express")
const router = new Router()
const studentController = require("../controllers/student.controller");

router.post("/add-student", studentController.addStudent)
router.get("/get-all-students", studentController.getAllStudents )
router.get("/get-one-student/:id", studentController.getOneStudent)
router.put("/update-student/", studentController.updateStudent)
router.delete("/delete-student/:id", studentController.deleteStudent)
module.exports = router