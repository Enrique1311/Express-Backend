const express = require("express");

const { programation } = require("../data/courses").coursesInfo;

const programationRouter = express.Router();

// Middleware

programationRouter.use(express.json());

programationRouter.get("/", (req, res) => {
	res.json(programation);
});

programationRouter.get("/:language", (req, res) => {
	const language = req.params.language;
	const results = programation.filter((course) => course.language === language);

	if (results.length === 0) {
		return res.status(404).send(`No se encontraron cursos de ${language}.`);
	}

	if (req.query.organize === "views") {
		return res.send(results.sort((a, b) => b.views - a.views));
	}
	res.json(results);
});

programationRouter.get("/:language/:level", (req, res) => {
	const language = req.params.language;
	const level = req.params.level;

	const results = programation.filter(
		(course) => course.language === language && course.level === level
	);

	if (results.length === 0) {
		return res
			.status(404)
			.send(`No se encontraron cursos de ${language} de nivel ${level}.`);
	}
	res.json(results);
});

programationRouter.post("/", (req, res) => {
	let newCourse = req.body;
	programation.push(newCourse);
	res.json(programation);
});

programationRouter.put("/:id", (req, res) => {
	const actualizedCourse = req.body;
	const id = req.params.id;

	const index = programation.findIndex((course) => course.id == id);

	if (index >= 0) {
		programation[index] = actualizedCourse;
	}
	res.json(programation);
});

programationRouter.patch("/:id", (req, res) => {
	const actualizedInfo = req.body;
	const id = req.params.id;

	const index = programation.findIndex((course) => course.id == id);

	if (index >= 0) {
		const courseToModify = programation[index];
		Object.assign(courseToModify, actualizedInfo);
	}
	res.json(programation);
});

programationRouter.delete("/:id", (req, res) => {
	const id = req.params.id;
	const index = programation.findIndex((course) => course.id == id);

	if (index >= 0) {
		programation.splice(index, 1);
	}
	res.json(programation);
});

module.exports = programationRouter;
