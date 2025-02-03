const express = require('express');
const router = express.Router();
const tasks = require('../Models/Tasks');

//Inserting(Creating) Data:
router.post("/addtask", async (req, res) => {
    const { TaskName, TaskDescription, TaskPriority } = req.body;

    try {
        const pre = await tasks.findOne({ TaskPriority: TaskPriority })
        console.log(pre);

        if (pre) {
            res.status(422).json("Task is already added.")
        }
        else {
            const addTask = new tasks({ TaskName, TaskDescription, TaskPriority })

            await addTask.save();
            res.status(201).json(addTask)
            console.log(addTask)
        }
    }
    catch (err) {
        console.log(err)
    }
})

//Getting(Reading) Data:
router.get('/tasks', async (req, res) => {

    try {
        const getTasks = await tasks.find({})
        console.log(getTasks);
        res.status(201).json(getTasks);
    }
    catch (err) {
        console.log(err);
    }
})

//Getting(Reading) individual Data:
router.get('/tasks/:id', async (req, res) => {

    try {
        const getTask = await tasks.findById(req.params.id);
        console.log(getTask);
        res.status(201).json(getTask);
    }
    catch (err) {
        console.log(err);
    }
})

//Editing(Updating) Data:
router.put('/updatetask/:id', async (req, res) => {
    const { TaskName, TaskDescription, TaskPriority } = req.body;

    try {
        const updateTasks = await tasks.findByIdAndUpdate(req.params.id, { TaskName, TaskDescription, TaskPriority }, { new: true });
        console.log("Data Updated");
        res.status(201).json(updateTasks);
    }
    catch (err) {
        console.log(err);
    }
})

//Deleting Data:
router.delete('/deletetask/:id', async (req, res) => {

    try {
        const deleteTask = await tasks.findByIdAndDelete(req.params.id);
        console.log("Data Deleted");
        res.status(201).json(deleteTask);
    }
    catch (err) {
        console.log(err);
    }
})


module.exports = router;