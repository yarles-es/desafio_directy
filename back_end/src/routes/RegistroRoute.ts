import { Router } from 'express';
import { RegistroController } from '../controllers/RegistroController';
import { RegistroMiddleware } from '../middlewares/RegistroMiddleware';
import { PrismaRegistroRepository } from '../repositories/PrismaRegistroRepository';
import { RegistroService } from '../services/RegistroService';

const registroRepository = new PrismaRegistroRepository();

const registroService = new RegistroService(registroRepository);

const registroController = new RegistroController(registroService);

const router = Router();

router.get('/', registroController.getAll.bind(registroController));

router.get('/:id', registroController.getById.bind(registroController));

router.post(
  '/',
  RegistroMiddleware.validateCreate,
  registroController.create.bind(registroController),
);

router.put(
  '/:id',
  RegistroMiddleware.validateUpdate,
  registroController.update.bind(registroController),
);

router.delete('/:id', registroController.delete.bind(registroController));

export default router;
