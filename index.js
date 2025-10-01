const express = require("express");
const teacherRoute = require("./routes/teacher.route")
const PORT = process.env.PORT || 5000
const env = require("dotenv").config()
const app = express();

app.listen(PORT, () => {console.log(`${PORT} is successfully running`)})
app.use(express.json())
app.use("/api", teacherRoute)