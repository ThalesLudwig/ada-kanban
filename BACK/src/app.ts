import "express-async-errors";
import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

import CardRouter from "./routers/CardRouter";
import AuthRouter from "./routers/AuthRouter";
import { authenticate } from "./middlewares/Authenticate";
import { logger } from "./middlewares/Logger";
import { connectDB } from "./configs/connection";

const app = express();
connectDB();

app.use(logger);
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use('/login/', AuthRouter);
app.use(authenticate);
app.use('/cards/', CardRouter);

app.use((error: Error, _: Request, res: Response) => {
  res.status(500).send(error.message);
});

export default app;
