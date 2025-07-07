import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    name : { type: String, required:true, trim: true},
    email: { type:String, required: true, lowercase: true},
    message: {type: String, required: true},
    status: { type: String, enum: ['new','addressed'], default: 'new' },
}, { timestamps: true});

export default mongoose.model("Feedback", feedbackSchema) ;