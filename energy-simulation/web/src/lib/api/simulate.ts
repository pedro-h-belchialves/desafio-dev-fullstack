"use server";

import { apiClient, ApiError } from "../client";

export type SimulationActionState = {
  success: boolean;
  error: string | null;
};

export async function getSimulation(
  _prevState: SimulationActionState,
  formData: any,
): Promise<SimulationActionState> {
  try {
    const apiFormData = new FormData();

    apiFormData.append("nome", formData.get("nomeCompleto") as string);
    apiFormData.append("email", formData.get("email") as string);
    apiFormData.append("telefone", formData.get("telefone") as string);

    const files = formData.getAll("file") as File[];

    for (const file of files) {
      apiFormData.append("file", file);
    }

    await apiClient.post("/leads/simulation", apiFormData);

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.details ?? "Erro ao enviar simulação",
      };
    }

    return {
      success: false,
      error: "Erro inesperado. Tente novamente.",
    };
  }
}
