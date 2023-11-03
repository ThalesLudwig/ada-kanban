import "express-async-errors";
import express from "express";

import CardRouter from "../routers/CardRouter";
import AuthRouter from "../routers/AuthRouter";

const testProvider = express();

testProvider.use(express.json());
testProvider.use("/login/", AuthRouter);
testProvider.use("/cards/", CardRouter);

export default testProvider;
