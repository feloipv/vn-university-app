export class CustomError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public errors?: string[]
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
