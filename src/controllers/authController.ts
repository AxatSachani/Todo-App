import { Request, Response } from 'express';
import User from '../models/user';
import { userValidationSchema } from '../schema/user';

export const register = async (req: Request, res: Response) => {
    const msg: string = 'User registered successfully'
    try {
        const { error, value } = userValidationSchema.validate(req.body)
        if (error) throw new Error(error.message)
        const { username, emailID, password } = value;
        const isExist = await User.findOne({ emailID })
        if (isExist) throw new Error('EmailID already exist!')
        const user = new User({ username, emailID, password });
        const token = await user.generateAuthToken()
        await user.save();
        res.status(201).send({ code: 201, success: true, message: msg, data: { token, userID: user._id } });
    } catch (error: any) {
        res.status(400).send({ code: 200, success: false, message: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    const msg: string = 'User Login successfully'
    try {
        const { error, value } = userValidationSchema.validate(req.body)
        if (error) throw new Error(error.message)
        const { emailID, password } = value;
        const user = await User.findByCredentials(emailID, password);
        const token = await user.generateAuthToken()
        res.status(200).send({ code: 200, success: true, message: msg, data: { token, userID: user._id } });
    } catch (error: any) {
        res.status(400).send({ code: 200, success: false, message: error.message });
    }
};
