import { Schema, model, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

interface IUser extends Document {
    username: string;
    password: string;
    token: string;
    generateAuthToken(): Promise<string>;
}

interface IUserModel extends Model<IUser> {
    findByCredentials(username: string, password: string): Promise<IUser>;
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String, required: true },
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 8);
    next();
});

// verify credential for login
UserSchema.statics.findByCredentials = async function (username: string, password: string) {
    const user = await this.findOne({ username });
    if (!user) throw new Error('Invalid username or password!')
    const isMatch = bcrypt.compareSync(password, user.password)
    if (!isMatch) throw new Error('Invalid username or password!')
    return user
}

// generate token
UserSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ id: user.username, userID: user._id }, JWT_SECRET, { expiresIn: '1h' })
    user.token = token
    await user.save()
    return token
}

const User = model<IUser, IUserModel>('User', UserSchema);

export default User;
