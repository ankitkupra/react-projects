import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userAuthRoute from "./src/routes/auth.js";
import adminAuthRoute from "./src/routes/admin/adminAuth.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 9000;
const mongodb = process.env.REACT_APP_MONGODB;

app.use(express.json());
app.use("/api", userAuthRoute);
app.use("/api", adminAuthRoute);

mongoose
  .connect(mongodb, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully!!!");
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
