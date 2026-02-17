"use server";

import { Lead } from "@/src/types/lead";
import { apiClient } from "../client";

export const getLeadByIdAction = async (id: string) => {
  try {
    const response: Lead = await apiClient.get(`/leads/${id}`);
    return response;
  } catch (err) {
    throw err;
  }
};
