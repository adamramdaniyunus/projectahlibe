import mongoose from 'mongoose';
import { Schema, } from 'mongoose';

const commentSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        desc: { type: String, required: true },
        post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
        parent: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
            default: null,
        },
        replyOnUser: {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        replyOnUserName: String
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
);

commentSchema.virtual("replies", {
    ref: "Comment",
    localField: "_id",
    foreignField: "parent",
});

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);

export default Comment;