"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Lead } from "../types/lead";
import { ApiError } from "../lib/client";
import { fetchLeadsAction } from "../lib/api/fetch-leads";
import { toast } from "sonner";

interface ListLeadsContextData {
  leads: Lead[];
  loading: boolean;
  error: string | null;
  search: string;
  totalPages: number;
  setSearch: Dispatch<SetStateAction<string>>;
  searchBy: "email" | "nome" | "telefone";
  setSearchBy: Dispatch<SetStateAction<"email" | "nome" | "telefone">>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  total: number;
  pageSize: number;
}

interface LeadsListResponse {
  leads: Lead[];
  total: number;
}
interface ListLeadsProviderData {
  children: ReactNode;
}
export const ListLeadsContext = createContext({} as ListLeadsContextData);

export const ListLeadsProvider = ({ children }: ListLeadsProviderData) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState<"email" | "nome" | "telefone">(
    "nome",
  );
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 5;

  async function fetchLeads() {
    setLoading(true);
    setError(null);

    let searchBody = {
      offset: page - 1,
      limit: pageSize,
    };

    searchBody = {
      ...searchBody,
      [searchBy]: search,
    };

    try {
      const response: LeadsListResponse = await fetchLeadsAction(searchBody);
      setLeads(response.leads);
      setTotal(response.total);
    } catch (err) {
      console.error(err);
      if (err instanceof ApiError) {
        setError(err.details ?? "Erro ao buscar leads");
      } else {
        setError("Erro inesperado");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    try {
      fetchLeads();
    } catch (err) {
      toast.error("Erro ao buscar leads");
    }
  }, [search, page]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <ListLeadsContext.Provider
      value={{
        leads,
        totalPages,
        loading,
        error,
        search,
        setSearch,
        searchBy,
        setSearchBy,
        page,
        setPage,
        total,
        pageSize,
      }}
    >
      {children}
    </ListLeadsContext.Provider>
  );
};
function fetchLeads() {
  throw new Error("Function not implemented.");
}
