const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;

let tasks = [];
app.use(cors());
app.use(bodyParser.json());

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const newTask = req.body;
    tasks.push(newTask);
    res.json({message: "Task pushed successfully"});
});

app.put('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body;
    let taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex > -1) {
        tasks[taskIndex] = updatedTask;
        res.json({message: "Task has been changed successfully"});
    } else {
        res.status(404).json({message: "Task not found"});
    }
});

app.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    let taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex > -1) {
        tasks.splice(taskIndex, 1);
        res.json({message: "Task has been deleted successfully"});
    } else {
        res.status(404).json({message: "Task not found"});
    }
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
