export interface FaturaDecoderResponse {
  codigo: string;
  modelo: string;
  fase: string;
  historico_consumo: {
    valor: number;
    mes: Date;
  }[];
}

export interface PFaturaDecoder {
  decode(fatura: Buffer): Promise<FaturaDecoderResponse>;
}
