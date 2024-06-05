// src/validation/todo.ts
import Joi from 'joi';

export const todoCreateSchema = Joi.object({
    userID: Joi.string().required().messages({
        'string.base': 'User ID should be a type of text',
        'string.empty': 'User ID cannot be an empty field',
        'any.required': 'User ID is a required field',
    }),
    title: Joi.string().required().messages({
        'string.base': 'Title should be a type of text',
        'string.empty': 'Title cannot be an empty field',
        'any.required': 'Title is a required field',
    }),
    description: Joi.string().allow('').optional().messages({
        'string.base': 'Description should be a type of text',
    }),
    completed: Joi.boolean().optional().messages({
        'boolean.base': 'Completed should be a boolean',
    }),
    dueDate: Joi.date().required().messages({
        'date.base': 'Due Date should be a valid date',
        'any.required': 'Due Date is a required field',
    }),
    reminderTime: Joi.date().optional().messages({
        'date.base': 'Due Date should be a valid date'
    })
});


export const todoUpdateSchema = Joi.object({
    userID: Joi.string().required().messages({
        'string.base': 'User ID should be a type of text',
        'string.empty': 'User ID cannot be an empty field',
        'any.required': 'User ID is a required field',
    }),
    id: Joi.string().required().messages({
        'string.base': 'Todo ID should be a type of text',
        'string.empty': 'Todo ID cannot be an empty field',
        'any.required': 'Todo ID is a required field',
    }),
    title: Joi.string().required().messages({
        'string.base': 'Title should be a type of text',
        'string.empty': 'Title cannot be an empty field',
        'any.required': 'Title is a required field',
    }),
    description: Joi.string().allow('').optional().messages({
        'string.base': 'Description should be a type of text',
    }),
    dueDate: Joi.date().required().messages({
        'date.base': 'Due Date should be a valid date',
        'any.required': 'Due Date is a required field',
    }),
    reminderTime: Joi.date().optional().messages({
        'date.base': 'Due Date should be a valid date'
    })
});
