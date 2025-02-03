const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema(
    {
        TaskName: {
            type: String,
            required: true,
        },
        TaskDescription: {
            type: String,
            required: true,
        },
        TaskPriority: {
            type: Number,
            required: true,
        },
    });

const Tasks = mongoose.model("Tasks", TaskSchema)
module.exports = Tasks;
