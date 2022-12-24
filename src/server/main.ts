import express from "express";
import { getVar, setVar } from "./DataManager";

const app = express();

// get a variable value
// nested variables can be accessed by using dot notation
// example: /api/getVar?name=foo.bar
app.get("/api/getVar", (req, res) => {
	const name = req.query.name;
	if (!name) {
		missingQueryParam("name", res);
		return;
	}
	if (typeof name !== "string") {
		invalidQueryParam("name", res);
		return;
	}
	const value = getVar(name);

	if (value === undefined) res.status(404).send("Variable does not exist");
	else res.send(value);
});

// set a variable value
// nested variables can be accessed by using dot notation
// example: /api/setVar?name=foo.bar&value=123
app.post("/api/setVar", (req, res) => {
	const name = req.query.name;
	if (!name) {
		missingQueryParam("name", res);
		return;
	}
	if (typeof name !== "string") {
		invalidQueryParam("name", res);
		return;
	}
	const value = req.query.value;
	if (!value) {
		missingQueryParam("value", res);
		return;
	}

	setVar(name, value);
	res.send("OK");
});

// ~~~~~~~~~~~~~~~ Errors ~~~~~~~~~~~~~~~ //

function missingQueryParam(name: string, res: express.Response) {
	const message = `Missing query parameter: ${name}`;
	res.status(400).send(message);
}

function invalidQueryParam(name: string, res: express.Response) {
	const message = `Invalid query parameter: ${name}`;
	res.status(400).send(message);
}

export const handler = app;
