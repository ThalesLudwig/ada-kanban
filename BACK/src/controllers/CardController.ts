import { Request, Response } from "express";

import { retrieve, retrieveAll, create, remove, update } from "../services/CardService";

async function getCard(req: Request, res: Response) {
  const id = req.params.id;
  const card = await retrieve(id);
  if (card) {
    res.json({ data: card });
  } else {
    res.status(404).json({ error: "Card not found" });
  }
}

async function getCards(_: Request, res: Response) {
  const cards = await retrieveAll()
  res.json({ data: cards });
}

async function postCard(req: Request, res: Response) {
  const { titulo, conteudo, lista } = req.body;
  if (titulo && conteudo && lista) {
    const card = await create({ titulo, conteudo, lista });
    res.status(201).json({ data: card });
  } else {
    res.status(400).json({ error: "Missing required attributes" });
  }
}

async function putCard(req: Request, res: Response) {
  const { titulo, conteudo, lista, id } = req.body;
  if (id !== req.params.id) return res.status(400).json({ error: "IDs do not match" });
  const card = await update({ titulo, conteudo, lista, id });
  if (!card) return res.status(404).json({ error: "Card not found" });
  res.status(200).json({ data: card });
}

async function deleteCard(req: Request, res: Response) {
  const { id } = req.params;
  const rowsRemoved: number = await remove(id);
  if (!rowsRemoved) return res.status(404).json({ error: "Card not found" });
  const cards = await retrieveAll();
  res.json({ data: cards.filter((card) => (card as any).id !== id) });
}

export default {
  getCard,
  getCards,
  postCard,
  putCard,
  deleteCard,
};
