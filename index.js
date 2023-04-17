const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// require("dotenv").config();

const addRouter = require("./routes/add");
const getRouter = require("./routes/get");
const deleteRouter = require("./routes/delete");
const editRotuer = require("./routes/edit");

// const { DB_URL, PORT } = process.env;
const DB_URL="mongodb+srv://user1:1234@cluster0.ce6m1co.mongodb.net/hardware-asset"
const PORT=4000
mongoose.connect(DB_URL, {
  useNewUrlParser: true
});

const app = express();
app.use(express.json());
app.use(cors());

app.use("/add", addRouter);
app.use("/get", getRouter);
app.use("/delete", deleteRouter);
app.use("/edit", editRotuer);



app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});