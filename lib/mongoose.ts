import mongoose from "mongoose"

const mongooseConnect = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            return mongoose.connection;
        } else {
            const url = process.env.MONGODB_URI || "";
            await mongoose.connect(url);
            return mongoose.connection;
        }
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

export default mongooseConnect