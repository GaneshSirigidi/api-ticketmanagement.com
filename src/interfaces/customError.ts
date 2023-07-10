export interface CustomErrorInterface {
    status?: number
    errorCode?: string
    errors?: any
    message?: string,
}

export class CustomError extends Error {
    status: number
    errorCode: string
    errors?: any

    constructor(status?: number, message?: string, errorCode?: string, errors?: any) {
        super(message)
        this.status = status
        this.errorCode = errorCode
        this.message = message
        this.errors = errors
    }

    setStatusCode(statusCode: number) {
        this.status = statusCode
    }

    setErrorCode(errorCode: string) {
        this.errorCode = errorCode
    }

    setMessage(message: string) {
        this.message = message
    }
}

