import { Card, CardType } from "../models/Card";

export const create = async ({
  titulo,
  conteudo,
  lista,
}: Omit<CardType, "id">) =>
  await Card.create({
    titulo,
    conteudo,
    lista,
  });

export const retrieve = async (id: string) => await Card.findByPk(id);

export const retrieveAll = async () => await Card.findAll();

export const update = async (card: CardType) => {
  const foundCard = await Card.findByPk(card.id);
  foundCard?.set({
    titulo: card.titulo,
    conteudo: card.conteudo,
    lista: card.lista,
  });
  return await foundCard?.save();
};

export const remove = async (id: string) =>
  await Card?.destroy({ where: { id: id } });
