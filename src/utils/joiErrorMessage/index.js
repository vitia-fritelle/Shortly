const joiErrorMessage = async (error) => error
    .details
    .reduce((acc, { message }) => `${acc} ${message}\n`, '');

export default joiErrorMessage;
