import utils from '../../utils';

const { CustomError } = utils;

const handleErrors = (err, _, res, next) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send(err.message);
    }
    return res.status(500).send('Houston, we have a problem!');
};

export default handleErrors;
