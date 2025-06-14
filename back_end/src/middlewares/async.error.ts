import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

type CustomError = Error & {
  statusCode: number;
  customError?: boolean;
};

export class AsyncError {
  public errorHandling: ErrorRequestHandler = (
    error: CustomError,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const statusCode = error.customError ? error.statusCode : 500;
    const message = error.customError ? error.message : 'Internal Server Error';

    console.error(`Error status: ${statusCode}, Message: ${error.message}`);

    res.status(statusCode).json({ error: message });
  };
}

export class AppError extends Error {
  public statusCode: number;
  public customError: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.customError = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Invalid request') {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Not authorized') {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Not allowed') {
    super(message, 403);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Conflict') {
    super(message, 409);
  }
}

export class InternalServerError extends AppError {
  constructor(message = 'Internal Server Error') {
    super(message, 500);
  }
}

export class UnprocessableEntityError extends AppError {
  constructor(message = 'Non-processable entity') {
    super(message, 422);
  }
}
