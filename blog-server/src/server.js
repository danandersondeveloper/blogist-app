const dotenv = require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const authRoutes = require("./Routes/AuthRoutes");

const privateUserRoutes = require("./Admin/Routes/UserRoutes");
const publicUserRoutes = require("./Routes/UserRoutes");

const privateBlogRoutes = require("./Admin/Routes/BlogRoutes");
const publicBlogRoutes = require("./Routes/BlogRoutes");

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
app.use(express.static('public'));
app.use('/Files/Uploads/', express.static('images'));

app.use("/auth", authRoutes);

app.use("/admin/user", privateUserRoutes);
app.use("/user", publicUserRoutes);

app.use("/admin/blog", privateBlogRoutes);
app.use("/blog", publicBlogRoutes);

// Root
app.get("/", (req, res) => {
	res.status(200).json({ message: "Blog Server: V0" })
});

mongoose.connection.once('open', () => {
	console.log("DB Connected: Blogist DB");
	app.listen(PORT, () => console.log(`Blog Sever: Listening on port ${PORT}`));
});