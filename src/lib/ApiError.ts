export class ApiError extends Error {
  public status: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "ApiError";
    this.status = statusCode;
  }
}
