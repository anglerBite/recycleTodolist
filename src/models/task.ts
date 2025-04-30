import mongoose from "mongoose";

export interface Task {
    content: string;
}

const taskSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    }
})

export const TaskModel = mongoose.models.Task || mongoose.model('Task', taskSchema);