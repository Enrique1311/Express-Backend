const express = require("express");

const { design } = require("../data/courses.js").coursesInfo;

const designRouter = express.Router();

designRouter.get("/", (req, res) => {
	res.send(JSON.stringify(design));
});

designRouter.get("/:theme", (req, res) => {
	const theme = req.params.theme;
	const results = design.filter((course) => course.theme === theme);

	if (results.length === 0) {
		return res.status(404).send(`No se encontraron cursos de ${theme}`);
	}
	res.send(JSON.stringify(results));
});

module.exports = designRouter;
