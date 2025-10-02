const Router = require("express")
const router = new Router()
const attendanceController = require("../controllers/student.attendance.controller");

router.post("/add-attendance", attendanceController.addAttendance)
router.get("/get-all-attendance", attendanceController.getAllAttendance)
router.put("/update-attendance/:id", attendanceController.updateAttendance)
router.delete("/delete-attendance/:id", attendanceController.deleteAttendance)
module.exports = router