import {
  FaturaDecoderResponse,
  PFaturaDecoder,
} from "@src/application/ports/fatura-decoder-port";
import { HttpClient } from "../http/http-client-interface";

interface MagicPdfFaturaDecoderResponse {
  unit_key: string;
  chargingModel: string;
  phaseModel: string;
  invoice: {
    consumo_fp: string;
    consumo_date: Date;
  }[];
}

export class MagicPdfFaturaDecoder implements PFaturaDecoder {
  constructor(private readonly httpClient: HttpClient) {}

  async decode(fatura: Buffer<ArrayBuffer>): Promise<FaturaDecoderResponse> {
    const url = process.env.MAGIC_PDF_FATURA_DECODER_URL;
    if (!url) {
      throw new Error("MAGIC_PDF_FATURA_DECODER_URL not found");
    }

    const formData = new FormData();

    const blob = new Blob([fatura], {
      type: "application/pdf",
    });

    formData.append("file", blob, "fatura.pdf");

    const response = await this.httpClient.post<MagicPdfFaturaDecoderResponse>(
      url,
      formData,
    );

    return this.responseMapper(response);
  }

  private responseMapper(
    response: MagicPdfFaturaDecoderResponse,
  ): FaturaDecoderResponse {
    return {
      codigo: response.unit_key,
      fase: response.chargingModel,
      modelo: response.phaseModel,
      historico_consumo: response.invoice
        .sort(
          (a, b) =>
            new Date(a.consumo_date).getTime() -
            new Date(b.consumo_date).getTime(),
        )
        .map((consumo) => ({
          mes: consumo.consumo_date,
          valor: parseFloat(consumo.consumo_fp),
        }))
        .slice(0, 12),
    };
  }
}
