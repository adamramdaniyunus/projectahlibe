import mongoose, { Document, model, models } from "mongoose";
import { Schema } from "mongoose";

const postModelSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    desc: {
        required: true,
        type: String
    },
    video: String,
    tags: {
        required: false,
        type: [String]
    },
    likes: [],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment",
    }],
    image: String,
}, {
    timestamps: true
})

interface PostDocument extends Document {
    user: string;
    desc: string;
    video?: string | null | undefined;
    tags: string[];
    likes: string[];
    comments: string[];
}

interface postModel extends mongoose.Model<PostDocument> {
    createdAt: Date;
    updatedAt: Date;
}

const Post: postModel = models?.Post as postModel || model('Post', postModelSchema);

export default Post