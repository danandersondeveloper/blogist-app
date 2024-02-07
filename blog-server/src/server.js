const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const user = require("./Routes/UserRoutes");

const PORT = process.env.PORT || 5500;
const app = express();

const corsConfig = {
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200
}

mongoose.connect(process.env.DB_CONNECTION_STRING);


// Middle-ware
app.use(express.json());
app.use(morgan("common"));
app.use(cors(corsConfig))


// Routes 
app.use("/user", user);


// Root
app.get("/", (req, res) => {
	res.status(200).json({ message: "Blog Server: V0" })
});

mongoose.connection.once('open', () => {
	console.log("DB Connected: Blogist DB");
	app.listen(PORT, () => console.log(`Blog Sever: Listening on port ${PORT}`));
});