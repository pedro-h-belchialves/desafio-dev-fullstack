"use server";

import { Lead } from "@/src/types/lead";
import { apiClient } from "../client";

interface FetchLeadsQuery {
  nome?: string;
  email?: string;
  telefone?: string;
  limit: number;
  offset: number;
}

interface LeadsListResponse {
  leads: Lead[];
  total: number;
}
export const fetchLeadsAction = async (query: FetchLeadsQuery) => {
  try {
    const queryParams = new URLSearchParams({
      nome: query.nome ?? "",
      email: query.email ?? "",
      telefone: query.telefone ?? "",
      limit: String(query.limit ?? 10),
      offset: String(query.offset ?? 0),
    });

    const response: LeadsListResponse = await apiClient.get(
      `/leads?${queryParams.toString()}`,
    );
    return response;
  } catch (err) {
    throw err;
  }
};
