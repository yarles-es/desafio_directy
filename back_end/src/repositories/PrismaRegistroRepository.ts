import { PrismaClient } from '@prisma/client';
import { CreateRegistroDTO, UpdateRegistroDTO } from '../dtos/RegistroDTO';
import { RegistroEntity } from '../entities/Registro';
import { IRegistroRepository } from '../interfaces/IRegistroRepository';

export class PrismaRegistroRepository implements IRegistroRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAll(): Promise<RegistroEntity[]> {
    return await this.prisma.registro.findMany({
      select: {
        id: true,
        time: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getById(id: number) {
    return await this.prisma.registro.findUnique({
      where: { id },
      select: {
        id: true,
        time: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async create(data: CreateRegistroDTO): Promise<RegistroEntity> {
    return await this.prisma.registro.create({
      data: {
        time: Number(data.time),
      },
    });
  }

  async update(id: number, data: UpdateRegistroDTO): Promise<RegistroEntity> {
    return await this.prisma.registro.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.registro.delete({
      where: { id },
    });
    return;
  }
}
