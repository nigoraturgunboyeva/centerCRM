const db = require("../database/db")

class studentController{
    async addStudent(req, res){
        const {fullname, phone_number, level} = req.body;
        const student = await db.query("INSERT INTO student (fullname, phone_number, level) values ($1, $2, $3) RETURNING *", [fullname, phone_number, level])
        res.json(student.rows[0])
    }
    async getOneStudent(req, res){
        const id = req.params.id;
        const student = await db.query("SELECT * from student where id=$1", [id]);
        res.json(student.rows[0])
    }
    async getAllStudents(req, res){
        const students  = await db.query("SELECT * from student");
        res.json(students.rows)
    }
    async updateStudent(req, res){
        const {id, fullname, phone_number, level} = req.body;
        const student = await db.query("UPDATE student set fullname=$1, phone_number=$2, level=$3 where id=$4 RETURNING *", [fullname, phone_number, level, id])
        res.json(student.rows[0])
    }
    async deleteStudent(req, res){
        const id = req.params.id;
        const student = await db.query('DELETE from student where id=$1 RETURNING *', [id])
        res.json(student.rows[0])
    }
}

module.exports = new studentController()