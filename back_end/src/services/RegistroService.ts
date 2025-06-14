import { CreateRegistroDTO, UpdateRegistroDTO } from '../dtos/RegistroDTO';
import { IRegistroRepository } from '../interfaces/IRegistroRepository';

export class RegistroService {
  constructor(private readonly repository: IRegistroRepository) {}

  async getAll(filters: { initialDate?: Date; finalDate?: Date }) {
    return await this.repository.getAll(filters);
  }

  async getById(id: number) {
    return await this.repository.getById(id);
  }

  async create(data: CreateRegistroDTO) {
    return await this.repository.create(data);
  }

  async update(id: number, data: UpdateRegistroDTO) {
    return await this.repository.update(id, data);
  }

  async delete(id: number) {
    return await this.repository.delete(id);
  }
}
