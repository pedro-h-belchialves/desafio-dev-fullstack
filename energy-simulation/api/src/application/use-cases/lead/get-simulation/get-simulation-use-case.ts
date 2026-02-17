import { ILeadRepository } from "@src/domain/repositories/lead-repository";
import { GetSimulationInput } from "./get-simulation-input";
import { PFaturaDecoder } from "@src/application/ports/fatura-decoder-port";
import { Unidade } from "@src/domain/entities/lead/unidade";
import { Consumo } from "@src/domain/entities/lead/consumo";
import { Lead } from "@src/domain/entities/lead/lead";
import { Email } from "@src/domain/entities/lead/value-objects/email";
import { Telefone } from "@src/domain/entities/lead/value-objects/telefone";
import { GetSimulationDTO } from "./get-simulation-dto";
import { ClientAlreadyExistsError } from "./errors/client-already-exists-error";
import { InvalidModelError } from "./errors/invalid-model-error";
import { InvalidFramingError } from "./errors/invalid-framing-error";
import { CreateLeadError } from "./errors/create-lead-error";

export class GetSimulationUseCase {
  constructor(
    private readonly leadRepository: ILeadRepository,
    private readonly faturaDecoder: PFaturaDecoder,
  ) {}

  async execute(props: GetSimulationInput): Promise<GetSimulationDTO> {
    const leadAlreadyExists = await this.leadRepository.findByEmail(
      props.email,
    );

    if (leadAlreadyExists) {
      throw new ClientAlreadyExistsError();
    }

    const unidades = await this.buildUnidades(props.contas);

    const lead = this.buildLead(props, unidades);

    try {
      await this.leadRepository.save(lead);
    } catch (e) {
      await this.leadRepository.delete(lead.id);
      throw new CreateLeadError();
    }

    return { leadId: lead.id };
  }

  private async buildUnidades(cotas: Buffer[]): Promise<Unidade[]> {
    const unidades: Unidade[] = [];

    for (const conta of cotas) {
      const fatura = await this.faturaDecoder.decode(conta);

      const consumos = fatura.historico_consumo.map((consumo) =>
        Consumo.create({
          mesDoConsumo: consumo.mes,
          consumoForaPontaEmKWH: consumo.valor,
        }),
      );

      const unidade = Unidade.create({
        codigoDaUnidadeConsumidora: fatura.codigo,
        modeloFasico: this.mapModelo(fatura.modelo),
        enquadramento: this.mapEnquadramento(fatura.fase),
        historicoDeConsumoEmKWH: consumos,
      });

      unidades.push(unidade);
    }

    return unidades;
  }

  private buildLead(props: GetSimulationInput, unidades: Unidade[]): Lead {
    return Lead.create({
      nome: props.nome,
      email: new Email(props.email),
      telefone: new Telefone(props.telefone),
      unidades,
    });
  }

  private mapModelo(modelo: string): "monofasico" | "bifasico" | "trifasico" {
    if (!["monofasico", "bifasico", "trifasico"].includes(modelo)) {
      throw new InvalidModelError();
    }
    return modelo as any;
  }

  private mapEnquadramento(fase: string): "AX" | "B1" | "B2" | "B3" {
    if (!["AX", "B1", "B2", "B3"].includes(fase)) {
      throw new InvalidFramingError();
    }
    return fase as any;
  }
}
