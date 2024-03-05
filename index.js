/** @format */

import express from "express";
import AppRouter from "./src/routers/router.js";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000; // Assuming a default port of 3000

app.use(cors());
app.use(express.json());
app.use("/", AppRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Server! 🌐");
});

const DB_URL = process.env.DB_URL || "mongodb://localhost:27017";
const DB_NAME = process.env.DB_NAME || "mydatabase";

mongoose
  .connect(`${DB_URL}/${DB_NAME}`)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
