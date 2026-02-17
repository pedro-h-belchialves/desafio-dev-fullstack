interface LeadDto {
  id: string;
  nome: string;
  email: string;
  telefone: string;
}

export interface FetchLeadsDto {
  leads: LeadDto[];
  total: number;
}
