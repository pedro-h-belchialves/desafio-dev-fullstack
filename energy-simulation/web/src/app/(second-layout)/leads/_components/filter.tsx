"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { ListLeadsContext } from "@/src/contexts/list-leads-context";
import { useContext } from "react";

export const Filter = () => {
  const { search, setSearch, searchBy, setSearchBy, setPage } =
    useContext(ListLeadsContext);

  return (
    <div className="flex flex-col md:flex-row md:items-end md:gap-4 gap-2">
      <Input
        label="Pesquisar"
        id="search"
        placeholder="Nome, email ou telefone"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex flex-col">
        <label className="text-sm font-medium text-foreground mb-1">
          Ordenar por
        </label>
        <select
          className="
              border
              border-border
              rounded-lg
              px-3 py-2
              text-foreground
              focus:outline-none
              focus:ring-2
              focus:ring-primary
            "
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value as any)}
        >
          <option value="nome">Nome</option>
          <option value="email">Email</option>
          <option value="telefone">Telefone</option>
        </select>
      </div>

      <Button variant="primary" size="md" onClick={() => setPage(1)}>
        Buscar
      </Button>
    </div>
  );
};
