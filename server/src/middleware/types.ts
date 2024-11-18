import { Application } from "express";
import {
  TypedRequest,
  TypedResponse,
  ExpressHandler,
} from "../types/express.types";

export interface ErrorResponse {
  status: string;
  error: {
    message: string;
    stack?: string;
  };
}

export type ErrorHandler = (
  err: Error,
  req: TypedRequest,
  res: TypedResponse<ErrorResponse>,
  next: NextFunction
) => void;

export type NotFoundHandler = ExpressHandler<any, ErrorResponse>;

export type MiddlewareConfig = (app: Application) => void;
