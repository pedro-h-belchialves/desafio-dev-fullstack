"use client";

import { ListLeadsContext } from "@/src/contexts/list-leads-context";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export const ListWrapper = () => {
  const { leads, loading, error } = useContext(ListLeadsContext);
  const { push } = useRouter();

  const handleClick = (leadId: string) => {
    push(`/leads/${leadId}`);
  };

  return (
    <>
      {loading ? (
        <p className="text-foreground-secondary">Carregando...</p>
      ) : error ? (
        <p className="text-error">{error}</p>
      ) : leads.length === 0 ? (
        <p className="text-foreground-secondary">Nenhum lead encontrado</p>
      ) : (
        <ListCase>
          <ListHeader fields={["Nome", "Email", "Telefone"]} />
          <ListContent
            fieldsValues={leads.map((lead) => ({
              id: lead.id,
              values: [lead.nome, lead.email, lead.telefone],
            }))}
            onRowClick={handleClick}
          />
        </ListCase>
      )}
    </>
  );
};

export const ListCase = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="overflow-x-auto border border-border rounded-lg shadow-sm">
      <table className="min-w-full divide-y divide-border">{children}</table>
    </div>
  );
};

export const ListHeader = ({ fields }: { fields: string[] }) => {
  return (
    <thead className="bg-background-to">
      <tr>
        {fields.map((field) => (
          <th
            key={field}
            className="px-4 py-2 text-left text-sm font-medium text-foreground"
          >
            {field}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export const ListContent = ({
  fieldsValues,
  onRowClick,
}: {
  fieldsValues: { id: string; values: string[] }[];
  onRowClick?: (id: string) => void;
}) => {
  return (
    <tbody className="bg-surface divide-y divide-border">
      {fieldsValues.map((item) => (
        <tr
          key={item.id}
          className="cursor-pointer hover:bg-muted"
          onClick={() => onRowClick?.(item.id)}
        >
          {item.values.map((field, index) => (
            <td key={index} className="px-4 py-2">
              {field}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
