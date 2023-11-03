import express from "express";

import CardController from "../controllers/CardController";

const CardRouter = express.Router();

CardRouter.get("/:id", CardController.getCard);
CardRouter.get("/", CardController.getCards);
CardRouter.post("/", CardController.postCard);
CardRouter.put("/:id", CardController.putCard);
CardRouter.delete("/:id", CardController.deleteCard);

export default CardRouter;
