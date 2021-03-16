import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "@config/auth";
import AppError from "@shared/errors/AppError";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authorization = request.headers.authorization;

  if (!authorization) {
    throw new AppError("JWT token is missing!");
  }

  const [, token] = authorization.split(" ");

  try {
    const decoded = verify(token, authConfig.secret);
    const { sub } = decoded as TokenPayload;

    request.user = { id: sub };
  } catch (err) {
    throw new AppError("Invalid JWT token");
  }

  return next();
}
