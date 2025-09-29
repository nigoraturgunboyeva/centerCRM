const express = require("express");
const teacherRoute = require("./routes/teacher.route")
const PORT = process.env.PORT || 5000

const app = express();

app.listen(PORT, () => {console.log(`${PORT} is successfully running`)})

app.use("/api", teacherRoute)