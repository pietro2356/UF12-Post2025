export class LogicalError implements Error{
  cause: unknown;
  readonly name = "LogicalError";
  readonly message: string = "";
  readonly error: any | null;

  constructor(message: string, cause: unknown) {
    this.message = message;
    this.cause = cause
  }

  toString(){
    return "LogicalError: " + this.message + "\nCaused by: " + this.cause;
  }

  getMessage(){
    return this.message;
  }
}
