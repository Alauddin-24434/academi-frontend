// src/utils/unwrapData.ts

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

export function unwrapData<T>(response: { data: ApiResponse<T> }): T {
  return response.data.data;
}
