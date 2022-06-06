const express = require('express');
const { getTask, updateTask, deleteTask, addTask, getAllTasks } = require('../controllers/taskController');
const { verifyToken, verifyAdmin } = require('../middlewares/verifyToken');

const router = express.Router();

router.route('/:id')
    .get(getTask)
    .patch(verifyToken, updateTask)
    .delete(verifyToken, verifyAdmin, deleteTask);

router.route('/')
    .post(verifyToken, verifyAdmin, addTask)
    .get(getAllTasks);

module.exports = router;