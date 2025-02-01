export class ApiResponseDto {
  message: string;
  data?: Record<string, any>;
  error?: any;
  statusCode: number;
}
