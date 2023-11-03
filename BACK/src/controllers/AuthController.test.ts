import supertest from "supertest";
import dotenv from "dotenv";

import testProvider from "../configs/testProvider";

describe("Auth Controller", () => {
  const requestWithSupertest = supertest(testProvider);

  beforeAll(() => {
    dotenv.config();
    (process.env.JWT_SECRET = "adatech"),
      (process.env.LOGIN = "letscode"),
      (process.env.PASSWORD = "lets@123");
  });

  it("should return a JWT token when valid credentials are provided", async () => {
    const res = await requestWithSupertest
      .post("/login")
      .send({ login: "letscode", senha: "lets@123" });
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("data");
  });

  it("should return 401 when invalid credentials are provided", async () => {
    const res = await requestWithSupertest
      .post("/login")
      .send({ login: "letscode", senha: "123" });
    expect(res.status).toEqual(401);
  });
});
