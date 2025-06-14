import { NextFunction, Request, Response } from 'express';
import { CreateRegistroDTO, UpdateRegistroDTO } from '../dtos/RegistroDTO';
import { BadRequestError } from './async.error';

export class RegistroMiddleware {
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
