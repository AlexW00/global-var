import express from "express";

const app = express();

app.get("/api/hello", (req, res) => {
	console.log("Hello from the server!");
	res.json({ hello: "world" });
});

export const handler = app;
