interface ApiClientOptions {
  tags?: string[];
  revalidate?: number | false;
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://api:5500";
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit & ApiClientOptions = {},
  ): Promise<T> {
    const { tags = [], revalidate, ...fetchOptions } = options;

    const url = `${this.baseUrl}${endpoint}`;

    const defaultHeaders: Record<string, string> = {};

    if (!(options.body instanceof FormData)) {
      defaultHeaders["Content-Type"] = "application/json";
    }

    const finalHeaders = {
      ...defaultHeaders,
      ...fetchOptions.headers,
    };

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers: finalHeaders,
        next: {
          tags,
          revalidate,
        },
      });

      if (!response.ok) {
        throw new ApiError(
          `API Error: ${response.status}`,
          response.status,
          JSON.parse(await response.text()).message,
        );
      }

      if (response.status !== 204) {
        return await response.json();
      } else {
        return response as T;
      }
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError("Network Error", 500, "Failed to connect to API");
    }
  }

  async get<T>(endpoint: string, options?: ApiClientOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  async post<T>(
    endpoint: string,
    data?: any,
    options?: ApiClientOptions,
  ): Promise<T> {
    let bodyData;

    if (data instanceof FormData) {
      bodyData = data;
    } else {
      bodyData = JSON.stringify(data);
    }

    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: bodyData,
    });
  }
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public details?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const apiClient = new ApiClient();
