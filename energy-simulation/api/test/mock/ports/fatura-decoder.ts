import { PFaturaDecoder } from "@src/application/ports/fatura-decoder-port";

export class FakeFaturaDecoder implements PFaturaDecoder {
  async decode(fatura: Buffer): Promise<any> {
    const consumos: { mes: Date; valor: number }[] = [];
    for (let i = 0; i < 12; i++) {
      consumos.push({
        mes: new Date(new Date().setMonth(i)),
        valor: 100,
      });
    }
    return {
      codigo: "123456",
      modelo: "monofasico",
      fase: "AX",
      historico_consumo: consumos,
    };
  }
}
