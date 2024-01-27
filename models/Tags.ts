import mongoose, { Schema } from 'mongoose';

const tagsSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

const Tags = mongoose.models.Tags || mongoose.model('Tags', tagsSchema);

export default Tags;
