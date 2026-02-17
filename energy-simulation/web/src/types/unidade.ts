import { Consumo } from "./consumo";

export interface Unidade {
  codigo: string;
  modelo: string;
  enquadramento: string;
  consumos?: Consumo[];
}
