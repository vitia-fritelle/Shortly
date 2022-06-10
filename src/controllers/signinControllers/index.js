import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import schemas from '../../schemas';
import db from '../../database';
import utils from '../../utils';
import config from '../../config';

const { signinSchema } = schemas;
const { CustomError, joiErrorMessage } = utils;
const configurations = { expiresIn: 60 * 60 * 24 };

const signin = async (req, res, next) => {
    try {
        const { email, password } = (
            await signinSchema
                .validateAsync(req.body)
                .catch(async (error) => {
                    const msg = await joiErrorMessage(error);
                    throw new CustomError(422, msg);
                })
        );
        const searchSql = 'SELECT password FROM users WHERE email=$1';
        const values = [email];
        const queryResult = (
            await db
                .client
                .query(searchSql, values)
                .catch((error) => { throw new CustomError(422, error); })
        );
        if (queryResult.rowCount === 0) {
            throw new CustomError(
                401,
                "The user isn't registered on the database",
            );
        }
        const userPassword = queryResult.rows[0].password;
        const validation = await bcrypt.compare(password, userPassword);
        if (!validation) {
            throw new CustomError(401, "email/password doesn't match");
        }
        const token = jwt.sign({ email }, config.secretKey, configurations);
        res.status(200).json({ token });
    } catch (e) {
        next(e);
    }
};

export default signin;
