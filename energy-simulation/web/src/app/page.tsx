"use client";

import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";

export default function OverviewPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background-from flex flex-col items-center px-4 py-12">
      <h1 className="text-3xl font-bold text-foreground mb-8 text-center">
        Bem-vindo ao painel de simulação de compensação energética
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        <div className="bg-surface p-6 rounded-xl shadow-md flex flex-col items-start">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Formulário de Simulação
          </h2>
          <p className="text-foreground-secondary mb-4">
            Permite que você realize uma simulação de compensação energética.
            Submeta seus dados e contas de energia para gerar uma previsão
            personalizada.
          </p>
          <Button variant="primary" onClick={() => router.push("/simular")}>
            Ir para o formulário
          </Button>
        </div>

        <div className="bg-surface p-6 rounded-xl shadow-md flex flex-col items-start">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Lista de Leads
          </h2>
          <p className="text-foreground-secondary mb-4">
            Aqui você pode consultar todas as simulações registradas, buscar por
            nome, email, fonte ou modelo e acompanhar os leads cadastrados.
          </p>
          <Button variant="primary" onClick={() => router.push("/leads")}>
            Ir para a lista de leads
          </Button>
        </div>
      </div>

      <p className="text-sm text-foreground-secondary mt-12 max-w-xl text-center">
        Use o formulário para cadastrar novas simulações e a lista para
        consultar e gerenciar todos os leads de forma simples e organizada.
      </p>
    </div>
  );
}
