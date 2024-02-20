import mongoose, { Document, model, models } from "mongoose";
import { Schema } from "mongoose";

const reportPostSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
    },
    desc: {
        required: true,
        type: String
    },
}, {
    timestamps: true
})

interface ReportDocument extends Document {
    user: string;
    desc: string;
    post: string;
}

interface reportModel extends mongoose.Model<ReportDocument> {
    createdAt: Date;
    updatedAt: Date;
}

const Report: reportModel = models?.Report as reportModel || model('Report', reportPostSchema);

export default Report