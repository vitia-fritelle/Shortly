import Joi from 'joi';

const urlsSchema = Joi.object({
    url: Joi.string().regex(/^https:\/\/|http:\/\//),
});

export default urlsSchema;
