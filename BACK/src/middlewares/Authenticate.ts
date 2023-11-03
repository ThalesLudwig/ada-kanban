import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

type JwtPayloadType = { exp: Date } & JwtPayload;

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { JWT_SECRET } = process.env;
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (authorization && token) {
      const decodedToken = jwt.verify(token, JWT_SECRET as jwt.Secret);

      const expiresAt = new Date((decodedToken as JwtPayloadType).exp * 1000);
      const isValid = expiresAt > new Date();
      if (!isValid) return res.sendStatus(401).end();

      res.locals = { user: (decodedToken as JwtPayloadType).user };
    } else {
      res.sendStatus(403).end();
    }
  } catch (error) {
    res.sendStatus(401).end();
  }
  next();
};
