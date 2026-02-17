export class Telefone {
  private readonly value: string;

  constructor(telefone: string) {
    const normalized = Telefone.normalize(telefone);

    if (!Telefone.isValid(normalized)) {
      throw new Error("Telefone inválido");
    }

    this.value = normalized;
  }

  /**
   * this method remove all non-numeric characters
   * Ex: "(11) 9 8765-4321" => "1198764321"
   */
  private static normalize(telefone: string): string {
    return telefone.replace(/\D/g, "");
  }

  /**
   * this method checks if the telefone is valid for Brazil
   */
  private static isValid(telefone: string): boolean {
    return /^(\d{10}|\d{11})$/.test(telefone);
  }

  getValue(): string {
    return this.value;
  }

  /**
   * this method formats the telefone value
   * Ex: 11987654321 -> (11) 98765-4321
   */
  format(): string {
    if (this.value.length === 11) {
      return this.value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }

    return this.value.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }

  equals(other: Telefone): boolean {
    return this.value === other.value;
  }
}
