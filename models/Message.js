import mongoose from 'mongoose'
const {Schema} = mongoose;

const MessageSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.models.Message || mongoose.model('Message', MessageSchema);