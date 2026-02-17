"use client";

import { Button } from "@/src/components/ui/button";
import { CheckCircle } from "iconoir-react";

interface SuccessMessageProps {
  onChange: () => void;
}

export default function SuccessMessage({ onChange }: SuccessMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center ">
      <CheckCircle className="w-16 h-16 text-success mb-6" />=
      <h1 className="text-2xl font-semibold text-foreground mb-2">
        Simulação enviada com sucesso!
      </h1>
      <p className="text-sm text-foreground-secondary mb-6 max-w-md">
        Recebemos suas informações e estamos processando a simulação. Em breve
        você receberá um retorno no seu email ou telefone.
      </p>
      <Button variant="primary" size="md" onClick={onChange}>
        Voltar para o formulário
      </Button>
    </div>
  );
}
