// src/validation/user.ts
import Joi from 'joi';

export const userValidationSchema = Joi.object({
    username: Joi.string()
        .required()
        .messages({
            'string.base': 'Username should be a type of text',
            'string.empty': 'Username cannot be an empty field',
            'any.required': 'Username is a required field',
        }),
    password: Joi.string()
        .required()
        .messages({
            'string.base': 'Password should be a type of text',
            'string.empty': 'Password cannot be an empty field',
            'any.required': 'Password is a required field',
        }),
});
