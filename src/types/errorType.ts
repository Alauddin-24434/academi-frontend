export interface IApiError {
  status: number;
  data: {
    success: false;
    statusCode: number;
    errName: string;
    message: string;
    errorDetails?: string;
  };
}
