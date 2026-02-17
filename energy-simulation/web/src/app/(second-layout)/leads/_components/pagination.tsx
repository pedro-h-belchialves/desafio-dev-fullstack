"use client";

import { Button } from "@/src/components/ui/button";
import { ListLeadsContext } from "@/src/contexts/list-leads-context";
import { useContext } from "react";

export const Pagination = () => {
  const { page, setPage, totalPages } = useContext(ListLeadsContext);
  return (
    <>
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Anterior
          </Button>
          <span className="text-sm text-foreground-secondary">
            Página {page} de {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Próximo
          </Button>
        </div>
      )}
    </>
  );
};
