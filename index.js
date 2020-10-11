if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const bodyParser = require("body-parser"),
	cookieParser = require("cookie-parser");

const express = require("express");

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(process.env.NODE_SERVER_PORT, () => {
	console.log(`✔ Our server is running on port ${process.env.PORT}`);
});
