export interface IConsumoProps {
  consumoForaPontaEmKWH: number;
  mesDoConsumo: Date;
}

export class Consumo {
  private constructor(private props: IConsumoProps) {}

  static create(props: IConsumoProps) {
    if (props.consumoForaPontaEmKWH <= 0) {
      throw new Error("Consumo inválido");
    }
    return new Consumo(props);
  }

  get valor(): number {
    return this.props.consumoForaPontaEmKWH;
  }

  get mes(): Date {
    return this.props.mesDoConsumo;
  }
}
