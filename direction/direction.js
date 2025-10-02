module.exports = function (app) {
    app.get("/", (req, res) => res.send("hello world!"));
    app.use("/api/teachers", require('../routes/teacher.route'));
    app.use("/api/students", require('../routes/student.route'));
}