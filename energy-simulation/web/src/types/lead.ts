import { Unidade } from "./unidade";

export interface Lead {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  unidades?: Unidade[];
}
