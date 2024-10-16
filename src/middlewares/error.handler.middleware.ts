import type { Request, Response, NextFunction } from "express";
import { HTTP_INTERNAL_SERVER_ERROR } from "@constants";
import { logger } from "@utils";

const errorHandlerMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const err = error as Error;
  logger.error(error);
  res
    .status(HTTP_INTERNAL_SERVER_ERROR)
    .json({ message: "server error", error: { ...err, message: err.message } });
};

export default errorHandlerMiddleware;
