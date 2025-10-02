require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5000', credentials: true }));

require("./direction/direction")(app); 

app.listen(PORT, () => {
    console.log(`${PORT} is successfully running 🚀`);
});
