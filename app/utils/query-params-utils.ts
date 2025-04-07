import { ObjectsInString } from "./object-to-string";

// queryParamsUtils.ts
interface QueryConfig {
  defaultValues?: Record<string, string>;
  allowedParams: string[];
}

export class QueryParamsOrganizer {
  private config: QueryConfig;

  constructor(config: QueryConfig) {
    this.config = config;
  }

  organizeParams(searchParams: Record<string, string | string[] | undefined>) {
    const params: Record<string, string> = {};

    // Adiciona valores default
    if (this.config.defaultValues) {
      Object.entries(this.config.defaultValues).forEach(([key, value]) => {
        if (this.config.allowedParams.includes(key)) {
          params[key] = value;
        }
      });
    }

    // Sobrescreve com searchParams se existirem
    Object.entries(searchParams).forEach(([key, value]) => {
      if (this.config.allowedParams.includes(key) && value !== undefined) {
        // Lida com arrays (por exemplo, de múltiplos valores)
        if (Array.isArray(value)) {
          params[key] = value[0];
        } else {
          params[key] = value;
        }
      }
    });

    return params;
  }

  buildQueryString(params: Record<string, string>) {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (this.config.allowedParams.includes(key) && value) {
        queryParams.append(key, value);
      }
    });

    const queryString = queryParams.toString();
    return queryString ? `?${queryString}` : "";
  }
}

// Função auxiliar para criar uma instância do organizador
export function createQueryParamsOrganizer(config: QueryConfig) {
  return new QueryParamsOrganizer(config);
}

// Função auxiliar para combinar URL base com parâmetros
export function buildUrlWithParams(
  baseUrl: string,
  params: Record<string, string>,
  organizer: QueryParamsOrganizer,
) {
  const queryString = organizer.buildQueryString(params);
  return `${baseUrl}${queryString}`;
}

// Tipos para uso com react-query
export interface UseQueryWithParamsConfig extends QueryConfig {
  baseUrl: string;
  queryKey: string[];
}

// Hook personalizado que combina useSearchParams com useApiQuery
export function createQueryKeyWithParams(
  queryKey: string[],
  params: Record<string, string>,
): string[] {
  return [...queryKey, ...ObjectsInString(params).split(" / ")];
}
