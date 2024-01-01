import { HttpStatus } from "../utils/enums";

class AppError {
    public readonly message;
    public readonly statusCode;

    constructor(statusCode: HttpStatus = HttpStatus.BAD_REQUEST, message: string, ) {
        this.message = message;
        this.statusCode = statusCode;
    }
}

export default AppError

