"use client";

import { Button } from "@/src/components/ui/button";
import { FileInput } from "@/src/components/ui/file-input";
import { Input } from "@/src/components/ui/input";
import { getSimulation, SimulationActionState } from "@/src/lib/api/simulate";
import { formatPhone } from "@/src/utils/format-phone";
import { useActionState, useEffect, useState, useTransition } from "react";
import SuccessMessage from "./sucess-card";
import { toast } from "sonner";

const initialState: SimulationActionState = {
  success: false,
  error: null,
};

export const SimulateForm = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(event.target.value));
  };

  const [state, formAction, isPending] = useActionState(
    getSimulation,
    initialState,
  );

  useEffect(() => {
    if (state.error) {
      toast.error("Erro ao criar usuário", {
        description: state.error,
      });
    }

    if (state.success) setSuccess(true);
  }, [state]);

  if (success) return <SuccessMessage onChange={() => setSuccess(false)} />;
  return (
    <form action={formAction} className="space-y-6">
      <Input label="Nome completo" name="nomeCompleto" required />

      <Input label="Email" name="email" type="email" required />

      <Input
        label="Telefone"
        name="telefone"
        placeholder="Telefone + DDD"
        required
        onChange={handlePhoneChange}
        value={phone}
      />

      <FileInput name="file" label="Documentos" accept="pdf" />

      {/* Divider */}
      <div className="pt-4 border-t border-slate-200">
        <p className="text-sm text-slate-500">
          Ao clicar em Solicitr simulação, você concorda com os termos de uso e
          privacidade.
        </p>
      </div>

      <Button
        type="submit"
        formAction={formAction}
        disabled={isPending}
        variant="primary"
        className="w-full"
      >
        {isPending ? "Enviando simulação..." : "Solicitar simulação"}
      </Button>

      {error && <p className="text-error">{error}</p>}
    </form>
  );
};
