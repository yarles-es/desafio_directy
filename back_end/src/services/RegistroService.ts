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
    const dateOnly = data.createdAt?.toISOString().split('T')[0];
    const currentDate = new Date(dateOnly + 'T03:00:00Z');
    const newData: UpdateRegistroDTO = {
      ...data,
      createdAt: currentDate,
    };
    return await this.repository.update(id, newData);
  }

  async delete(id: number) {
    return await this.repository.delete(id);
  }
}
