import { NextFunction, Request, Response } from 'express';
import { CreateRegistroDTO, UpdateRegistroDTO } from '../dtos/RegistroDTO';
import { BadRequestError } from './async.error';

type RegistroQueryParams = {
  initialDate?: string;
  finalDate?: string;
};

export class RegistroMiddleware {
  static validateGetAll(req: Request, _res: Response, next: NextFunction) {
    try {
      const { initialDate, finalDate } = req.query as RegistroQueryParams;

      if (initialDate && isNaN(Date.parse(initialDate as string))) {
        throw new BadRequestError('Data inicial inválida');
      }

      if (finalDate && isNaN(Date.parse(finalDate as string))) {
        throw new BadRequestError('Data final inválida');
      }

      if (
        initialDate &&
        finalDate &&
        new Date(initialDate as string) > new Date(finalDate as string)
      ) {
        throw new BadRequestError('A data inicial não pode ser maior que a data final');
      }

      next();
    } catch (error) {
      next(error);
    }
  }

  static validateCreate(req: Request, _res: Response, next: NextFunction) {
    try {
      const { time } = req.body as CreateRegistroDTO;

      if (!time) throw new BadRequestError(`Obrigatório informar o tempo`);

      if (isNaN(Number(time))) throw new BadRequestError('Número de tempo inválido');

      if (Number(time) < 0) throw new BadRequestError('O tempo não pode ser negativo');

      next();
    } catch (error) {
      next(error);
    }
  }
  static validateUpdate(req: Request, _res: Response, next: NextFunction) {
    try {
      const { time, createdAt } = req.body as UpdateRegistroDTO;

      if (!time && !createdAt) {
        throw new BadRequestError(
          'Pelo menos um campo deve ser atualizado: tipo ou data de criação',
        );
      }

      if (time && isNaN(Number(time))) {
        throw new BadRequestError('Número de tempo inválido');
      }

      if (createdAt && isNaN(Date.parse(new Date(createdAt).toString()))) {
        throw new BadRequestError('Data de criação inválida');
      }

      req.body = {
        ...(time !== undefined && { time: Number(time) }),
        ...(createdAt !== undefined && { createdAt: new Date(createdAt) }),
      };

      next();
    } catch (error) {
      next(error);
    }
  }
}
