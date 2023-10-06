/* eslint-disable prettier/prettier */
/* eslint-disable node/no-unsupported-features/es-syntax */
import formidable from 'formidable';
import { create, get, remove } from '../model/todo';

exports.create = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields) => {
    const { description } = fields;
    if (!fields.description) {
      return res.status(400).json({ error: 'Description is required' });
    }
    try {
      const newTask = await create(description);
      return res.status(201).send({ data: newTask.rows[0] });
    } catch (error) {
      return res.status(400).json({ error });
    }
  });
  res.send('OK');
};

exports.get = async (req, res) => {
  try {
    const tasks = await get();
    res.status(200).json({ data: tasks.rows });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.remove = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields) => {
    const { id } = fields;
    if (!fields.id) {
      return res.status(400).json({ error: 'Id is required' });
    }
    try {
      const deletedTask = await remove(id);
      return res.status(200).send({ data: deletedTask.rows[0] });
    } catch (error) {
      return res.status(400).json({ error });
    }
  });
  res.send('OK');
};
