interface ConsumoDto {
  mes: Date;
  valor: number;
}

interface UnidadeDto {
  codigo: string;
  modelo: string;
  enquadramento: string;
  consumos: ConsumoDto[];
}

export interface GetLeadByIdDto {
  id: string;
  email: string;
  telefone: string;
  unidades: UnidadeDto[];
  nome: string;
}
