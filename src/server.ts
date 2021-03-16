import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import routes from "./routes";
import "./database";
import uploadConfig from "./configs/upload";
import AppError from "./errors/AppError";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.use("/files", express.static(uploadConfig.directory));

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ message: err.message, status: "error" });
  }

  console.error(err);
  return response
    .status(500)
    .json({ message: "Internal Server Error", status: "error" });
});

app.listen(3333, () => {
  console.log(`This server is running on port 3333!!`);
});
