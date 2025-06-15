import type { Register } from "../types/Registers";
import { genericRequest } from "./@genericRequest";

export const getallRegisters = async (
  initialDate?: string,
  FinalDate?: string
) => {
  return genericRequest<Register[]>(
    "get",
    `/?${initialDate ? `initialDate=${initialDate}` : ""}${
      FinalDate ? `&FinalDate=${FinalDate}` : ""
    }`
  );
};

export const getRegisterById = async (id: number) => {
  return genericRequest<Register>("get", `/${id}`);
};

export const createRegister = async (register: Pick<Register, "time">) => {
  return genericRequest<Register>("post", "/", register);
};

export const updateRegister = async (
  id: number,
  register: Pick<Register, "time" | "createdAt">
) => {
  return genericRequest<Register>("put", `/${id}`, register);
};

export const deleteRegister = async (id: number) => {
  return genericRequest<Register>("delete", `/${id}`);
};
