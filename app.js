const express = require("express");
const app = express();

const { coursesInfo } = require("./data/courses");

// Routers

const programationRouter = require("./routers/programation");
app.use("/api/courses/programation", programationRouter);

const designRouter = require("./routers/design");
app.use("/api/courses/design", designRouter);

// Routing

app.get("/", (req, res) => {
	res.send("Mi servidor con Express");
});

app.get("/api/courses", (req, res) => {
	res.send(JSON.stringify(coursesInfo));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`El servidor está escuchando en http://localhost:${PORT}...`);
});
