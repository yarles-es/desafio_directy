export type CreateRegistroDTO = {
  time: number;
};

export type UpdateRegistroDTO = {
  time?: number;
  createdAt?: Date;
};

export type RegistroResponseDTO = {
  id: number;
  time: number;
  createdAt: string;
  updatedAt: string;
};
