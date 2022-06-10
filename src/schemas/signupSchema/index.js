import Joi from 'joi';
import schema from '../signinSchema';

const signupSchema = schema.keys({
    name: Joi.string().required(),
    confirmPassword: Joi.ref('password'),
});

export default signupSchema;
