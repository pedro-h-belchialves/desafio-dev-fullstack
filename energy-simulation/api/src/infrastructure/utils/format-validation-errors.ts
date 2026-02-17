type ValidationErrorItem = {
  expected?: string;
  received?: string;
  path: (string | number)[];
  message: string;
};

type ZodErrorString = {
  name: string;
  message: string;
};

export function formatValidationErrors(errorString: string): string {
  try {
    const parsedError = JSON.parse(errorString) as ZodErrorString;

    const validationErrors = JSON.parse(
      parsedError.message,
    ) as ValidationErrorItem[];

    return validationErrors
      .map((error) => {
        const field = error.path.join(".");
        const expected = error.expected ?? "valor válido";
        const received = error.received ?? "valor inválido";

        return `${field}: esperado ${expected}, recebido ${received}`;
      })
      .join("\n");
  } catch {
    return "Erro de validação inválido";
  }
}
