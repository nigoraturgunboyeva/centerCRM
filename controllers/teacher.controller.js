const jwt = require("jsonwebtoken");
const db = require("../database/db")
const bcrypt = require("bcrypt");
require("dotenv").config();

class teacherController{
    async signUp(req, res) {
  try {
    const { fullname, email, password } = req.body;

    const teacher = await db.query("SELECT * FROM teachers WHERE email=$1", [email]);
    if (teacher.rows.length > 0) {
      return res.status(400).json({ error: "This email already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.query(
      "INSERT INTO teachers (fullname, email, password) VALUES ($1, $2, $3) RETURNING id, fullname, email",
      [fullname, email, hashedPassword]
    );

    const teacher_jwt = result.rows[0];

    const token = jwt.sign(
      { id: teacher_jwt.id, fullname: teacher_jwt.fullname },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Signup successful", token, teacher: teacher_jwt });
  } catch (error) {
    console.error(error, "error while signing UP");
    res.status(500).json({ error: "Something went wrong" });
  }
    }
    async signIn(req, res) {
  try {
    const { email, password } = req.body;

    const result = await db.query("SELECT * FROM teachers WHERE email=$1", [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ error: "User doesn't exist!" });
    }

    const teacher = result.rows[0];

    const isPasswordValid = await bcrypt.compare(password, teacher.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: teacher.id, email: teacher.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      teacher: { id: teacher.id, fullname: teacher.fullname, email: teacher.email }
    });
  } catch (error) {
    console.error(error, "error while signing in");
    res.status(500).json({ error: "Something went wrong" });
  }
    }
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
