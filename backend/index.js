require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the 'cors' middleware
const routes = require("./routes/routes");
const UserRoute = require("./routes/UserRoute");

const mongoString = process.env.DATABASE_URL;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", routes);
app.use("/api/user", UserRoute);

mongoose.connect(mongoString);
const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});
database.once("connected", () => {
  console.log("Database Connected");
});

app.listen(process.env.PORT, () => {
  console.log(`Server Started at ${process.env.PORT}`);
});
