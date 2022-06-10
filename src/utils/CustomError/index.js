import { STATUS_CODES } from 'http';

const CustomError = function _(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
    const phrase = STATUS_CODES[statusCode];
    if (phrase) {
        this.statusPhrase = phrase;
    } else {
        throw new Error('Undefined Status Code');
    }
};
CustomError.prototype = new Error();
export default CustomError;
