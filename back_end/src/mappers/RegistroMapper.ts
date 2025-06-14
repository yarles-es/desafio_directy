import { RegistroResponseDTO } from '../dtos/RegistroDTO';
import { RegistroEntity } from '../entities/Registro';

export class RegistroMapper {
  static toDTO(entity: RegistroEntity): RegistroResponseDTO {
    return {
      id: entity.id,
      time: entity.time,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }
}
