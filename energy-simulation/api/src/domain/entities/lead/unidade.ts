import { Entity } from "../../shared/entity";
import { Consumo } from "./consumo";

export interface IUnidadeProps {
  codigoDaUnidadeConsumidora: string;
  modeloFasico: "monofasico" | "bifasico" | "trifasico";
  enquadramento: "AX" | "B1" | "B2" | "B3";
  historicoDeConsumoEmKWH: Consumo[];
}

export class Unidade extends Entity<IUnidadeProps> {
  private constructor(props: IUnidadeProps, id?: string) {
    super(props, id);
  }

  static create(props: IUnidadeProps, id?: string) {
    if (!["monofasico", "bifasico", "trifasico"].includes(props.modeloFasico)) {
      throw new Error("modelo inválido");
    }

    if (!["AX", "B1", "B2", "B3"].includes(props.enquadramento)) {
      throw new Error("enquadramento inválido");
    }

    if (props.historicoDeConsumoEmKWH.length !== 12) {
      throw new Error("unidade deve ter 12 meses de consumo");
    }

    return new Unidade(props, id);
  }

  get codigo(): string {
    return this.props.codigoDaUnidadeConsumidora;
  }

  get modelo(): "monofasico" | "bifasico" | "trifasico" {
    return this.props.modeloFasico;
  }

  get enquadramento(): "AX" | "B1" | "B2" | "B3" {
    return this.props.enquadramento;
  }

  get consumos(): Consumo[] {
    return [...this.props.historicoDeConsumoEmKWH];
  }
}
