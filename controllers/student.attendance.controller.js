const db = require("../database/db");
class studentController{
    async addAttendance(req, res){
        try {
            const { student_id, date, status} = req.body;
            const result = await db.query(`INSERT INTO student_attendance 
            (student_id, date, status) 
            VALUES ($1, $2, $3) RETURNING *`, [student_id, date, status]);
            res.json(result.rows[0])
        } catch (error) {
            console.error(error.message, `error while adding student's attendace`);
            res.status(500).json({ error: "Server error" });
        }
    }
    async getAllAttendance(req, res){
        try {
            const result = await db.query(`SELECT a.id, s.fullname, a.date, a.status
                FROM student_attendance a JOIN student s ON a.student_id = s.id
                ORDER BY a.date DESC`)
                res.json(result.rows)
        } catch (error) {
             console.error(error.message, `error while getting all students' attendace`);
            res.status(500).json({ error: "Server error" });
        }
    }
    async updateAttendance(req, res){
        try {
            const { id } = req.params;
            const {status, date} = req.body;
            const result = await db.query(` UPDATE student_attendance SET status=$1, date=$2 
                where id=$3 RETURNING *`,
                [status, date, id]
            );
             if (result.rows.length === 0) {
            return res.status(404).json({ error: "Attendance not found" });
            }

            res.json(result.rows[0]);
        } catch (error) {
             console.error(error.message);
             res.status(500).json({ error: "Server error" });
        }
    }
    async deleteAttendance(req, res){
        try {
            const { id } = req.params;
            const deleted = await db.query( `DELETE FROM student_attendance WHERE id = $1 RETURNING *`,
            [id])

            if (deleted.rows.length === 0) {
            return res.status(404).json({ error: "Attendance not found" });
            }

            res.json({ message: "Attendance deleted" });
        } catch (error) {
             console.error(error.message);
            res.status(500).json({ error: "Server error" });
        }
    }
}
module.exports = new studentController()