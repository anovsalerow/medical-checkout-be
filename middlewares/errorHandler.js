export class ErrorHandler extends Error {
    constructor(status, message) {
        super(message);
        this.statusCode = status;
    };
};

export class ErrorValidation extends ErrorHandler {
    constructor(message) {
        super(400, message);
    };
};

export class ErrorUnAuthorized extends ErrorHandler {
    constructor(message) {
        super(401, message);
    };
};

export class ErrorForbidden extends ErrorHandler {
    constructor(message) {
        super(403, message);
    };
};

export class ErrorObjectNotFound extends ErrorHandler {
    constructor(message) {
        super(404, message);
    };
};

export class ErrorUserAlreadyExist extends ErrorHandler {
    constructor(message) {
        super(409, message);
    };
};