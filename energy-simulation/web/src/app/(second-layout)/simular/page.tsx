import Image from "next/image";

import { SimulateForm } from "./_components/simulate-form";

export default function SimularPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-background-from to-background-to">
      <div className="max-w-4xl mx-auto px-6 flex flex-col gap-5 justify-center items-center   py-12">
        <header className="mb-10 text-center">
          <h1
            className="
            text-4xl
            font-bold
            tracking-tight
            text-foreground
            max-w-2xl
       
            mb-3
          "
          >
            Descubra quanto{" "}
            <span className="text-primary">você pode economizar </span>na sua
            conta de energia
          </h1>

          <p
            className="
            text-slate-600
            text-lg
            max-w-2xl
            mx-auto
          "
          >
            Preencha seus dados e envie suas informações para receber uma
            simulação personalizada de compensação energética.
          </p>
        </header>

        <div
          className="
          bg-surface
          rounded-2xl
          shadow-sm
          w-full
          md:w-3/4
          xl:w-2/3
          border
          border-border
          p-8
        "
        >
          <SimulateForm />
        </div>

        <p
          className="
          text-center
          text-sm
          text-slate-500
          mt-6
        "
        >
          Seus dados estão seguros e serão usados apenas para a simulação.
        </p>
      </div>
    </main>
  );
}
