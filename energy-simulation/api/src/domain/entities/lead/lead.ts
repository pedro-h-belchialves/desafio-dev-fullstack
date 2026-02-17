import { Entity } from "../../shared/entity";
import { Unidade } from "./unidade";
import { Email } from "./value-objects/email";
import { Telefone } from "./value-objects/telefone";

export interface ILeadProps {
  nome: string;
  email: Email;
  telefone: Telefone;
  unidades: Unidade[];
}

export class Lead extends Entity<ILeadProps> {
  constructor(props: ILeadProps, id?: string) {
    super(props, id);
  }

  static create(props: ILeadProps, id?: string) {
    if (props.unidades.length === 0) {
      throw new Error("lead deve ter ao menos uma unidade");
    }

    return new Lead(props, id);
  }

  get unidades(): Unidade[] {
    return [...this.props.unidades];
  }

  get email(): Email {
    return this.props.email;
  }

  get telefone(): Telefone {
    return this.props.telefone;
  }

  get nome(): string {
    return this.props.nome;
  }
}
