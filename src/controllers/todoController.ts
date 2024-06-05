import { Request, Response } from 'express';
import Todo from '../models/todo';
import { todoCreateSchema, todoUpdateSchema } from '../schema/todo';
import { cancelEmailReminder, scheduleEmailReminder } from '../utils/emailService';

export const getTodos = async (req: Request, res: Response) => {
    const msg: string = "Todos List"
    try {
        const { userID } = req.body.user
        const { tododate } = req.params
        const date = tododate || new Date().toISOString().slice(0, 10)
        const today = new Date(date)
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1)

        const todos = await Todo.find({ userID: userID, createdAt: { $gte: today, $lt: tomorrow } }).select({ _id: 1, title: 1, description: 1, completed: 1, dueDate: 1, createdAt: 1, updatedAt: 1 });
        res.status(200).send({ code: 200, success: true, message: msg, data: { todos } });
    } catch (error: any) {
        res.status(400).send({ code: 400, success: false, message: error.message });
    }
};

export const createTodo = async (req: Request, res: Response) => {
    const msg: string = "Todo Created"
    try {
        const { userID, emailID } = req.body.user
        const { title, description, completed, dueDate, reminderTime } = req.body
        const { error } = todoCreateSchema.validate({ userID, title, description, completed, dueDate, reminderTime })
        if (error) throw new Error(error.message)
        const newTodo = new Todo({ title, description, completed, dueDate, userID, reminderTime, reminderScheduled: !!reminderTime });
        await newTodo.save();
        if (reminderTime) {
            scheduleEmailReminder(emailID, newTodo);
        }

        res.status(201).send({ code: 201, success: true, message: msg });
    } catch (error: any) {
        res.status(400).send({ code: 400, success: false, message: error.message });
    }
};

export const updateTodo = async (req: Request, res: Response) => {
    const msg: string = "Todo Updated"
    try {
        const { userID, emailID } = req.body.user
        const { id } = req.params
        const { title, description, dueDate, reminderTime } = req.body

        const { error } = todoUpdateSchema.validate({ userID, id, title, description, dueDate, reminderTime })
        if (error) throw new Error(error.message)

        const date = new Date().toISOString().slice(0, 10)
        const today = new Date(date)
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1)

        const todo = await Todo.findOne({ _id: id, userID });
        if (!todo) throw new Error('Todo Not Found!')
        if (todo.createdAt < today || todo.createdAt > tomorrow) throw new Error('You can update only todays Todos!')

        todo.title = title
        todo.description = description
        todo.dueDate = dueDate

        if (reminderTime && reminderTime !== todo.reminderTime) {
            cancelEmailReminder(todo.id);
            todo.reminderTime = reminderTime;
            todo.reminderScheduled = true;
            scheduleEmailReminder(emailID, todo);
        } else if (todo.reminderScheduled && !reminderTime) {
            cancelEmailReminder(todo.id);
            todo.reminderTime = undefined;
            todo.reminderScheduled = false;
        }

        await todo.save()
        res.status(200).send({ code: 200, success: true, message: msg });
    } catch (error: any) {
        res.status(400).send({ code: 400, success: false, message: error.message });
    }
};

export const deleteTodo = async (req: Request, res: Response) => {
    const msg: string = "Todo Deleted"
    try {
        const { userID } = req.body.user
        const { id } = req.params
        const date = new Date().toISOString().slice(0, 10)
        const today = new Date(date)
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1)

        const todo = await Todo.findOne({ _id: id, userID });
        if (!todo) throw new Error('Todo Not Found!')
        if (todo.createdAt < today || todo.createdAt > tomorrow) throw new Error('You can delete only todays Todos!')

        if (todo.reminderScheduled) {
            cancelEmailReminder(todo.id);
        }

        await todo.deleteOne()
        res.status(200).send({ code: 200, success: true, message: msg });
    } catch (error: any) {
        res.status(400).send({ code: 400, success: false, message: error.message });
    }
};


export const markComplateTodo = async (req: Request, res: Response) => {
    const msg: string = "Todo Mark As Complated"
    try {
        const { userID } = req.body.user
        const { id } = req.params
        const todo = await Todo.findOneAndUpdate({ _id: id, userID }, { $set: { completed: true } });
        if (!todo) throw new Error('Todo Not Found!')
        if (todo.reminderScheduled) {
            cancelEmailReminder(todo.id);
        }
        res.status(200).send({ code: 200, success: true, message: msg });
    } catch (error: any) {
        res.status(400).send({ code: 400, success: false, message: error.message });
    }
};

export const markUnComplateTodo = async (req: Request, res: Response) => {
    const msg: string = "Todo Mark As UnComplated"
    try {
        const { userID, emailID } = req.body.user
        const { id } = req.params

        const todo = await Todo.findOneAndUpdate({ _id: id, userID }, { $set: { completed: false } });
        if (!todo) throw new Error('Todo Not Found!')
        if (todo.reminderScheduled) {
            scheduleEmailReminder(emailID, todo);
        }
        res.status(200).send({ code: 200, success: true, message: msg });
    } catch (error: any) {
        res.status(400).send({ code: 400, success: false, message: error.message });
    }
};
