import supertest from "supertest";

import * as CardService from "../services/CardService";
import testProvider from "../configs/testProvider";
import { Card } from "../models/Card";

jest.mock("../services/CardService");

describe("Card Controller", () => {
  const requestWithSupertest = supertest(testProvider);

  beforeEach(() => {
    jest.spyOn(CardService, "retrieveAll").mockResolvedValue([]);
    jest.clearAllMocks();
  });

  it("GET - should return a list of cards", async () => {
    const response = await requestWithSupertest.get("/cards");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: [] });
  });

  it("POST - should create a new card", async () => {
    const cardAttributes = { titulo: "Foo", conteudo: "Bar", lista: "ToDo" };
    const card = Card.build({ ...cardAttributes, lista: "ToDo" });
    jest.spyOn(CardService, "create").mockResolvedValue(card);
    const response = await requestWithSupertest.post("/cards").send(cardAttributes);
    expect(response.status).toBe(201);
    expect(response.body.data.titulo).toEqual(cardAttributes.titulo);
    expect(response.body.data.conteudo).toEqual(cardAttributes.conteudo);
    expect(response.body.data.lista).toEqual(cardAttributes.lista);
  });

  it("PUT - should update an existing card", async () => {
    const cardAttributes = { titulo: "Foo", conteudo: "Bar", lista: "ToDo" };
    const card = Card.build({ ...cardAttributes, lista: "ToDo" });
    const updatedAttributes = { ...cardAttributes, id: (card as any).id, titulo: 'updated' }
    jest.spyOn(CardService, "retrieveAll").mockResolvedValue([card]);
    jest.spyOn(CardService, "update").mockResolvedValue(card.set({ titulo: 'updated' }));
    const response = await requestWithSupertest.put(`/cards/${(card as any).id}`).send(updatedAttributes);
    expect(response.status).toBe(200);
    expect(response.body.data.titulo).toEqual("updated");
    expect(response.body.data.conteudo).toEqual(cardAttributes.conteudo);
    expect(response.body.data.lista).toEqual(cardAttributes.lista);
  });

  it("PUT - should return a 404 if the card is not found", async () => {
    const card = { id: '1', titulo: "Foo", conteudo: "Bar", lista: "ToDo" };
    jest.spyOn(CardService, "update").mockResolvedValue(undefined);
    const response = await requestWithSupertest.put("/cards/1").send(card);
    expect(response.status).toBe(404);
  });

  it("DELETE - should delete an existing card and return the rest of the list", async () => {
    jest.spyOn(CardService, "remove").mockResolvedValue(1);
    const card = Card.build({ titulo: "Foo", conteudo: "Bar", lista: "ToDo" });
    jest.spyOn(CardService, "retrieveAll").mockResolvedValue([card]);
    const response = await requestWithSupertest.delete(`/cards/${(card as any).id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: [] });
  });

  it("DELETE - should return a 404 if the card is not found", async () => {
    jest.spyOn(CardService, "remove").mockResolvedValue(0);
    const response = await requestWithSupertest.delete("/cards/1");
    expect(response.status).toBe(404);
  });
});
