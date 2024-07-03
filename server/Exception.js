class Exception {
    constructor(error) {
        this.error = error != undefined ? error = error : "";
        this.message = error?.message!=undefined ? error.message
        :error ? error : "Error";
        this.statusCode = 500;
    }
}

//Invalid request - the server could not understand the request due to missing, incorrect or invalid data
class BadRequestException extends Exception {
    constructor(error) {
        super(error != undefined ? error : { message: 'bad request' });
        this.statusCode = 400;
    }
}

//Authentication failed. The user is not authorized to perform the requested action
class UnauthorizedException extends Exception {
    constructor(error) {
        super(error != undefined ? error : { message: 'Unauthorized' });
        this.statusCode = 401;
    }
}

//Access is prohibited. The requested resource is available, but the user is not authorized to access it
class ForbiddenException extends Exception {
    constructor(error) {
        super(error != undefined ? error :{ message: 'Forbidden' });
        this.statusCode = 403;
    }
}

//Not found. The requested resource does not exist
class NotFoundException extends Exception {
    constructor(error) {
        super(error != undefined ? error : { message: 'Not Found' });
        this.statusCode = 404;
    }
}

//conflict. The current situation does not allow the execution of the request. For example - an attempt to create a resource that already exists
class ConflictException extends Exception {
    constructor(error) {
        super(error != undefined ? error :{ message: 'conflict' });
        this.statusCode = 409;
    }
}

//Internal server error. The server encountered an unexpected problem and cannot process the request
class InternalServerException extends Exception {
    constructor(error) {
        super(error != undefined ? error :{ message: 'Internal Server' });
        this.statusCode = 500;
    }
}

//The service is not available. The server is temporarily unable to handle requests
class ServiceUnavailableException extends Exception {
    constructor(error) {
        super(error != undefined ? error :{ message: 'Service unavailable' });
        this.statusCode = 503;
    }
}

module.exports = {
    Exception,
    BadRequestException,
    NotFoundException,
    UnauthorizedException,
    ForbiddenException,
    ConflictException,
    InternalServerException,
    ServiceUnavailableException
};