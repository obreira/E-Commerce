// eslint-disable-next-line prettier/prettier
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
const pool = require('./database');

const create = (description) => {
  pool.query(
    'INSERT INTO todo (description) VALUES ($1) RETURNING *',
    [description],
    (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results.rows);
    }
  );
};

const get = () => {
  pool.query('SELECT * FROM todo', (error, results) => {
    if (error) {
      throw error;
    }
    console.log(results.rows);
  });
};

const remove = (id) => {
  pool.query('DELETE FROM todo WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    console.log(results.rows);
  });
};

module.exports = {
  create,
  get,
  remove,
};
