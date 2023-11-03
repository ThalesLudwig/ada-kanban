import { Column } from "./Column";

export type Card = {
  id: string;
  titulo: string;
  lista: Column;
  conteudo: string;
};
