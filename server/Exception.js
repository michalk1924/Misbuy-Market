class Exception {
    constructor(error) {
        this.error = error != undefined ? error = error : "";
        this.message = error?.message!=undefined ? error.message
        :error ? error : "Error";
        this.statusCode = 500;
    }
}
//בקשה לא תקינה- השרת לא הצליח להבין את הבקשה עקב נתונים חסרים, שגויים או לא חוקיים
class BadRequestException extends Exception {
    constructor(error) {
        super(error != undefined ? error : { message: 'bad request' });
        this.statusCode = 400;
    }
}

//אימות נכשל. המשתמש לא מורשה לבצע את הפעולה המבוקשת
class UnauthorizedException extends Exception {
    constructor(error) {
        super(error != undefined ? error : { message: 'Unauthorized' });
        this.statusCode = 401;
    }
}

//גישה אסורה. המשאב המבוקש זמין, אך המשתמש אינו מורשה לגשת אליו
class ForbiddenException extends Exception {
    constructor(error) {
        super(error != undefined ? error :{ message: 'Forbidden' });
        this.statusCode = 403;
    }
}

//לא נמצא. המשאב המבוקש לא קיים
class NotFoundException extends Exception {
    constructor(error) {
        super(error != undefined ? error : { message: 'Not Found' });
        this.statusCode = 404;
    }
}

//קונפליקט. המצב הנוכחי לא מאפשר את ביצוע הבקשה. לדוגמא- נסיון ליצור משאב שכבר קיים
class ConflictException extends Exception {
    constructor(error) {
        super(error != undefined ? error :{ message: 'conflict' });
        this.statusCode = 409;
    }
}

//שגיאת שרת פנימית. השרת נתקל בבעיה בלתי צפויה ואינו יכול לטפל בבקשה
class InternalServerException extends Exception {
    constructor(error) {
        super(error != undefined ? error :{ message: 'Internal Server' });
        this.statusCode = 500;
    }
}

//השירות אינו זמין. השרת זמנית לא יכול לטפל בבקשות
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