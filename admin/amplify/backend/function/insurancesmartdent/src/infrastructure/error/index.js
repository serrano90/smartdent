/**
 * Error Exception Created
 */

class AppError extends Error {
    constructor(type, code, message) {
        super(message)
        this.type = type
        this.code = code
    }

    getType() {
        return this.type
    }

    getCode() {
        return this.name
    }

    getMessage() {
        return this.message
    }
}

class InvalidCustomerRutException extends AppError {
    constructor(message) {
        super("InvalidCustomerRutException", "InvalidCustomerRutException", message)
        Error.captureStackTrace(this, InvalidCustomerRutException)
    }
}

class TheRutExistException extends AppError {
    constructor(message) {
        super("TheRutExistException", "TheRutExistException", message)
        Error.captureStackTrace(this, TheRutExistException)
    }
}

class DoesNotExistCustomerException extends AppError{
    constructor(message) {
        super("DoesNotExistCustomerException", "DoesNotExistCustomerException", message)
        Error.captureStackTrace(this, DoesNotExistCustomerException)
    }
}

class DoesNotPossibleDeleteThisCustomerException extends AppError {
    constructor(message) {
        super("DoesNotPossibleDeleteThisCustomerException", "DoesNotPossibleDeleteThisCustomerException", message)
        Error.captureStackTrace(this, DoesNotPossibleDeleteThisCustomerException)
    }
}

class DoesNotPossibleSendEmailException extends AppError{
    constructor(message) {
        super("DoesNotPossibleSendEmailException", "DoesNotPossibleSendEmailException", message)
        Error.captureStackTrace(this, DoesNotPossibleSendEmailException)
    }
}

class TheCustomerHaveASubscriptionException extends AppError {
    constructor(message) {
        super("TheCustomerHaveASubscriptionException", "TheCustomerHaveASubscriptionException", message)
        Error.captureStackTrace(this, TheCustomerHaveASubscriptionException)
    }
}

class TheCustomerDontHaveASubscriptionException extends AppError {
    constructor(message) {
        super("TheCustomerDontHaveASubscriptionException", "TheCustomerDontHaveASubscriptionException", message)
        Error.captureStackTrace(this, TheCustomerDontHaveASubscriptionException)
    }
}

class InvoiceDoesNotExistException extends AppError {
    constructor(message) {
        super("InvoiceDoesNotExistException", "InvoiceDoesNotExistException", message)
        Error.captureStackTrace(this, InvoiceDoesNotExistException)
    }
}

class InvoiceDoesNotPossibleChangerMailIsSendException extends AppError {
    constructor(message) {
        super("InvoiceDoesNotPossibleChangerMailIsSendException", "InvoiceDoesNotPossibleChangerMailIsSendException", message)
        Error.captureStackTrace(this, InvoiceDoesNotPossibleChangerMailIsSendException)
    }
}

class SubscriptionActiveException extends AppError {
    constructor(message) {
        super("SubscriptionActiveException", "SubscriptionActiveException", message)
        Error.captureStackTrace(this, SubscriptionActiveException)
    }
}

class InternalServerErrorException extends AppError {
    constructor() {
        super("InternalServerErrorException", "InternalServerErrorException", "Internal Server Error")
        Error.captureStackTrace(this, InternalServerErrorException)
    }
}

module.exports = {
    AppError,
    InvalidCustomerRutException,
    TheRutExistException,
    DoesNotExistCustomerException,
    DoesNotPossibleDeleteThisCustomerException,
    DoesNotPossibleSendEmailException,
    TheCustomerHaveASubscriptionException,
    TheCustomerDontHaveASubscriptionException,
    InvoiceDoesNotExistException,
    InvoiceDoesNotPossibleChangerMailIsSendException,
    SubscriptionActiveException,
    InternalServerErrorException
}