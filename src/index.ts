import express, { Request, Response } from "express";
import mongoose from "mongoose";
import "dotenv/config";
import env from "./constants/environments";
import routes from "./routers/Routes";

const app = express();
const port = process.env.PORT || 3000;

const uri = env.MONGODB_URI as string;
mongoose.connect(uri);

const db = mongoose.connection;
db.on("error", (error: Error) => console.error(error));
db.once("open", () => console.log("MongoDB connected"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("", routes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
