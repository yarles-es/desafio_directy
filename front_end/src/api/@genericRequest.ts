import axios from "axios";
import api from "./@api";

export interface SuccessResponse<T> {
  data: T;
}

export const genericRequest = async <T>(
  method: "get" | "post" | "put" | "delete" | "patch",
  url: string,
  body?: unknown
): Promise<T> => {
  try {
    const apiInstance = api();
    const response = await apiInstance({
      method,
      url,
      data: body ? body : {},
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erro desconhecido");
    }

    // Lança qualquer outro tipo de erro não relacionado ao Axios
    throw new Error("Erro na requisição");
  }
};
