const dotenv = require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const user = require("./Routes/UserRoutes");

const PORT = process.env.PORT || 5500;
const app = express();

const corsConfig = {
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200,
	credentials: true
}

mongoose.connect(process.env.DB_CONNECTION_STRING);


// Middle-ware
app.use(cookieParser());
app.use(express.json());
app.use(morgan("common"));
app.use(cors(corsConfig))


// Routes 
app.use("/user", user);


app.get('/logout', (req, res) => {
	res.clearCookie("auth_user");
	res.status(200).json({message: 'sucsess'});
});

app.get('/auth', (req, res) => {
	console.log(req.cookies);
	if (req.cookies.auth_user) {
		res.status(200).json({message: 'autherised'});
	}
});

// Root
app.get("/", (req, res) => {
	res.status(200).json({ message: "Blog Server: V0" })
});

mongoose.connection.once('open', () => {
	console.log("DB Connected: Blogist DB");
	app.listen(PORT, () => console.log(`Blog Sever: Listening on port ${PORT}`));
});