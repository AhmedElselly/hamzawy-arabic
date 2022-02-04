import mongoose from 'mongoose';
const {Schema} = mongoose;

const CategorySchema = new Schema({
    main: {
        type: String,
        required: true
    },
    subCategory: [
        {
            type: String
        }
    ]
}, {
    timestamps: true
});

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);