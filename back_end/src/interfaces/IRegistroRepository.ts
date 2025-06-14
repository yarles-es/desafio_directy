import { CreateRegistroDTO, UpdateRegistroDTO } from '../dtos/RegistroDTO';
import { RegistroEntity } from '../entities/Registro';

export interface IRegistroRepository {
  getAll(): Promise<RegistroEntity[]>;
  getById(id: number): Promise<RegistroEntity | null>;
  create(data: CreateRegistroDTO): Promise<RegistroEntity>;
  update(id: number, data: UpdateRegistroDTO): Promise<RegistroEntity>;
  delete(id: number): Promise<void>;
}
