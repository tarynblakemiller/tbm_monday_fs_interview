import { Request, Response, NextFunction } from "express";

export interface TypedRequest<T = any> extends Request {
  body: T;
}

export interface TypedResponse<T = any> extends Response {
  json: (body: T) => TypedResponse<T>;
}

export type ExpressHandler<ReqBody = any, ResBody = any> = (
  req: TypedRequest<ReqBody>,
  res: TypedResponse<ResBody>,
  next: NextFunction
) => Promise<void> | void;

export interface ApiResponse<T = any> {
  status: string;
  data?: T;
  error?: string;
  message?: string;
}
