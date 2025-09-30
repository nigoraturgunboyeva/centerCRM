const db = require("../database/db")
const bcrypt = require("bcrypt");
class teacherController{
    async addTeacher(req, res) {
        const {fullname, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 15);
        const newTeacher = await db.query('INSERT INTO teachers (fullname, email, password) values ($1, $2, $3) RETURNING *', [fullname, email, hashedPassword])
        res.json(newTeacher.rows[0])
    }
    async getOneTeacher(req, res) {
       const id = req.params.id;
       const teacher = await db.query('SELECT * from teachers where id = $1 ', [id])
       res.json(teacher.rows[0]) 
    }
    async getAllTeachers(req, res) {
        const teachers = await db.query('SELECT * from teachers')
        res.json(teachers.rows)
    }
    async updateTeacher(req, res) {
        const {id, fullname, email, password} = req.body;
         const hashedPassword = password 
        ? await bcrypt.hash(password, 10) 
        : null;

        const updated_teacher = await db.query("UPDATE teachers set fullname=$1, email=$2, password=$3 where id=$4 RETURNING *", [fullname, email, hashedPassword, id])
        res.json(updated_teacher.rows[0])
    }
    async deleteTeacher(req, res) {
        const id = req.params.id;
        const deletedTeacher = await db.query("DELETE from teachers where id=$1 RETURNING *", [id] )
        res.json(deletedTeacher)
    }
}

module.exports = new teacherController()