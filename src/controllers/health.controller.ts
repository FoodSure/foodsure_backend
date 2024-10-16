import type { Request, Response } from "express";
import { HTTP_OK } from "@constants";

export const checkHealth = async (_: Request, res: Response) => {
  res.status(HTTP_OK).json({ message: "Ok" });
};
