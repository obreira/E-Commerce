const express = require('express');
const router = express.Router();
const todo = require('../model/todo');

router.post('/create', async (req, res) => {
    const { description } = req.body;
    if (!description) {
        return res.status(400).json({ error: 'Description is required' });
    }
    try {
        const newTask = await todo.create(description);
        return res.status(201).send({ data: newTask.rows[0] });
    } catch (error) {
        return res.status(400).json({ error, });
    }
}
);

router.get('/get', async (req, res) => {
    try {
        const tasks = await todo.get();
        return res.status(200).send({ data: tasks.rows });
    } catch (error) {
        return res.status(400).json({ error, });
    }
}
);

router.delete('/remove', async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ error: 'Id is required' });
    }
    try {
        const deletedTask = await todo.remove(id);
        return res.status(200).send({ data: deletedTask.rows[0] });
    } catch (error) {
        return res.status(400).json({ error, });
    }
}
);

module.exports = router;
