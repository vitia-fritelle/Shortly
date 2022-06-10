import jwt from 'jsonwebtoken';
import config from '../../config';
import utils from '../../utils';
import db from '../../database';

const { CustomError } = utils;

const userAuth = async (authorization) => {
    if (!authorization) {
        throw new CustomError(401, 'O header não foi enviado');
    }
    const token = authorization.replace('Bearer ', '');
    const { email } = jwt.verify(token, config.secretKey);
    const searchSql = 'SELECT id FROM users WHERE email=$1;';
    const queryResult = (
        await db
            .client
            .query(searchSql, [email])
            .catch((error) => { throw new CustomError(422, error); })
    );
    if (queryResult.rowCount === 0) {
        throw new CustomError(
            401,
            "The user isn't registered on the database",
        );
    }
    const userId = queryResult.rows[0].id;
    return userId;
};

export default userAuth;
