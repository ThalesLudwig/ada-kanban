import Sequelize, { Model } from "sequelize";

import { Column } from "./Column";
import { connection } from "../configs/connection";

export type CardType = {
  id: string;
  titulo: string;
  conteudo: string;
  lista: Column;
};

export const Card = connection.define<Model<CardType, Omit<CardType, "id">>>("card", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  conteudo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lista: {
    type: Sequelize.STRING,
    defaultValue: "ToDo",
    allowNull: false,
  },
});
