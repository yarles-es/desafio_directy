import { NextFunction, Request, Response } from 'express';
import { RegistroMapper } from '../mappers/RegistroMapper';
import { BadRequestError } from '../middlewares/async.error';
import { RegistroService } from '../services/RegistroService';

export class RegistroController {
  constructor(private readonly service: RegistroService) {}

  async getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const registros = await this.service.getAll();

      const registrosFormatted = registros.map((registro) => RegistroMapper.toDTO(registro));
      res.json(registrosFormatted);
    } catch (error) {
      next(error);
    }
  }
  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) throw new BadRequestError('id informado é inválido');
      const registro = await this.service.getById(id);

      if (!registro) throw new BadRequestError('Registro não encontrado');

      const registroFormatted = RegistroMapper.toDTO(registro);

      res.json(registroFormatted);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const registro = await this.service.create(req.body);

      const registroFormatted = RegistroMapper.toDTO(registro);

      res.status(201).json(registroFormatted);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) throw new BadRequestError('id informado é inválido');

      const registro = await this.service.update(id, req.body);

      const registroFormatted = RegistroMapper.toDTO(registro);

      res.json(registroFormatted);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) throw new BadRequestError('id informado é inválido');

      await this.service.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
