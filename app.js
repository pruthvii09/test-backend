require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const examRoutes = require("./routes/examRoute");
const questionRoutes = require("./routes/questionRoute");
const submitRoutes = require("./routes/submitRoute");
const adminRoutes = require("./routes/adminRoute");
//initialize app
const app = express();

//use middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/api/user", userRoutes);
app.use("/api/exam", examRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/submit", submitRoutes);
app.use("/api/admin", adminRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server Started at Port ${process.env.PORT} 🚀🚀`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
