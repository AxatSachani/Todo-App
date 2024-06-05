import { Schema, model, Document, Types } from 'mongoose';

export interface ITodo extends Document {
    userID: Types.ObjectId
    title: string;
    description: string;
    completed: boolean;
    dueDate: Date;
    reminderTime?: Date;
    reminderScheduled: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const TodoSchema = new Schema<ITodo>({
    userID: { type: Schema.Types.ObjectId, required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
    dueDate: { type: Date, required: true },
    reminderTime: { type: Date },
    reminderScheduled: { type: Boolean, default: false },
    createdAt: { type: Date },
    updatedAt: { type: Date }
}, { timestamps: { currentTime: () => new Date() } });

const Todo = model<ITodo>('todo', TodoSchema);

export default Todo;
