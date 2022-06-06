const Task = require('../models/Task');

//add new task
exports.addTask = async(req, res) => {
    if (!req.body.name) {
        res.status(400).json({
            success: false,
            message: 'Please provide name of task'
        })
        return;
    }
    try {
        const task = await Task.create(req.body);
        res.status(200).json({
            success: true,
            data: task
        })
    } catch(err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: `Error: ${err.message}`
        })
    }
}

//update a task by id
exports.updateTask = async(req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if(!task) {
            res.status(404).json({
                success: false,
                message: 'No task found',
            })
            return;
        }
        res.status(200).json({
            success: true,
            data: task,
        })
    } catch(err) {
        res.status(500).json({
            success: false,
            message: `Error: ${err.message}`
        })
    }
}

//delete a task by id
exports.deleteTask = async(req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task) {
            res.status(404).json({
                success: false,
                message: 'No task found'
            })
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Deleted Task'
        })
    } catch(err) {
        res.status(500).json({
            success: false,
            message: `Error: ${err.message}`
        })
    }
}

//get a task by id
exports.getTask = async(req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if(!task) {
            res.status(404).json({
                success: false,
                message: 'No task found'
            })
            return;
        }
        res.status(200).json({
            success: true,
            data: task
        })
    } catch(err) {
        res.status(500).json({
            success: false,
            message: `Error: ${err.message}`
        })
    }
}

//get all tasks
exports.getAllTasks = async(req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({
            success: true,
            data: tasks
        })
    } catch(err) {
        res.status(500).json({
            success: false,
            message: `Error: ${err.message}`
        })
    }
}