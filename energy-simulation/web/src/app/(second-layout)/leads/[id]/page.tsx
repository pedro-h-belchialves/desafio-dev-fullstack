import Link from "next/link";
import { ArrowLeftCircle } from "iconoir-react";

import { getLeadByIdAction } from "@/src/lib/api/get-lead-by-id";
import { ApiError } from "@/src/lib/client";
import { Consumo } from "@/src/types/consumo";
import { Lead } from "@/src/types/lead";
import { Unidade } from "@/src/types/unidade";
import { toast } from "sonner";

interface LeadPageProps {
  params: Promise<{ id: string }>;
}

async function getLeadById(id: string): Promise<Lead> {
  try {
    return await getLeadByIdAction(id);
  } catch (err) {
    if (err instanceof ApiError) throw err;
    toast.error("Erro ao buscar lead");
    throw new Error("Erro inesperado ao buscar lead");
  }
}

export default async function LeadDetailPage({ params }: LeadPageProps) {
  const resolvedParams = await params;

  const { id } = resolvedParams;
  let lead: Lead;

  try {
    lead = await getLeadById(id);
  } catch (err) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <p className="text-error text-lg font-medium mb-4">
          {(err as Error).message || "Erro ao buscar lead"}
        </p>
        <Link href="/leads">
          <div>Voltar para a lista de leads</div>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-from p-6">
      <div className="flex justify-between md:justify-start  gap-5 items-center mb-6">
        <Link className="text-foreground" href="/leads">
          <ArrowLeftCircle className="w-8 h-8 text-primary" />
        </Link>
        <h1 className="text-3xl font-bold text-foreground">Detalhes do Lead</h1>
      </div>

      <div className="bg-surface p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Informações do lead
        </h2>
        <p>
          <strong>Nome:</strong> {lead.nome}
        </p>
        <p>
          <strong>Email:</strong> {lead.email}
        </p>
        <p>
          <strong>Telefone:</strong> {lead.telefone}
        </p>
      </div>

      {lead.unidades &&
        lead.unidades.map((unit: Unidade) => (
          <div
            key={unit.codigo}
            className="bg-surface p-6 rounded-xl shadow-md mb-6"
          >
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Unidade: {unit.codigo}
            </h3>
            <p>
              <strong>Modelo Fásico:</strong> {unit.modelo}
            </p>
            <p>
              <strong>Enquadramento:</strong> {unit.enquadramento}
            </p>
            s
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-foreground">
                      Mês
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-foreground">
                      Consumo fora de ponta (kWh)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {unit.consumos &&
                    unit.consumos.map((c: Consumo, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-2">
                          {new Date(c.mes).toLocaleDateString("pt-BR", {
                            month: "long",
                            year: "numeric",
                          })}
                        </td>
                        <td className="px-4 py-2">{c.valor} kWh</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
    </div>
  );
}
