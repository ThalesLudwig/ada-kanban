import { Request, Response } from "express";
import jwt from "jsonwebtoken";

async function login(req: Request, res: Response) {
  const { login, senha } = req.body;
  const { LOGIN, PASSWORD, JWT_SECRET } = process.env;
  const tokenOptions = { expiresIn: "1h" }

  if (login === LOGIN && senha === PASSWORD) {
    const token = jwt.sign({ user: LOGIN }, JWT_SECRET  as jwt.Secret, tokenOptions);
    return res.json({ data: token });
  } else {
    res.status(401).end();
  }
}

export default {
  login,
};
