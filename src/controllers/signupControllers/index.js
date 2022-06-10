import bcrypt from 'bcryptjs';
import schemas from '../../schemas';
import db from '../../database';
import utils from '../../utils';

const { signupSchema } = schemas;
const { CustomError, joiErrorMessage } = utils;

const signup = async (req, res, next) => {
    try {
        const { name, email, password } = (
            await signupSchema
                .validateAsync(req.body)
                .catch(async (error) => {
                    const msg = await joiErrorMessage(error);
                    throw new CustomError(422, msg);
                })
        );
        const hashedPassword = await bcrypt.hash(password, 10);
        const values = [name, email, hashedPassword];
        const insertSql = 'INSERT INTO users(name,email,password) VALUES ($1,$2,$3);';
        (
            await db
                .client
                .query(insertSql, values)
                .catch((error) => { throw new CustomError(422, error.detail); })
        );
        res.sendStatus(201);
    } catch (e) {
        next(e);
    }
};

export default signup;
