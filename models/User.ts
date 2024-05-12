import mongoose, { Document, Schema, models } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },
    desc: String,
}, {
    timestamps: true,
});

interface UserDocument extends Document {
    name: string;
    email: string;
    images?: string | null | undefined;
    verified: boolean
    desc: string;
    background: string | null
}

interface UserModel extends mongoose.Model<UserDocument> {
    createdAt: Date;
    updatedAt: Date;
}

const User: UserModel = mongoose.models.User as UserModel || mongoose.model<UserDocument, UserModel>('User', userSchema);

export default User;
