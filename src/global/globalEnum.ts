export enum HttpStatus{
    ERROR= 404,
    SUCCESS=200,
    FORBIDDEN=403,
    UNAUTHORIZED=401,
}

export enum HttpMessage{
    ERROR='Server Internal Error',
    SUCCESS='Server Response Success',
    UNAUTHORIZED='Unauthorized Access',
    FORBIDDEN = 'Forbidden Access'
}