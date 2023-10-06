import React, { useState, useEffect } from 'react';
import './App.css';
import { getTodos, createTodo, removeTodo } from './util';

const App = () => {
  const [todo, setTodo] = useState({
    description: '',
  });
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState('');

  const fetchTodos = async () => {
    try {
      const todos = await getTodos();
      setTodoList(todos.data);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTodo = await createTodo({
        description: todo.description,
      });
      setTodoList([...todoList, newTodo.data]);
      setTodo({
        description: '',
      });
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const deletedTodo = await removeTodo({
        id,
      });
      setTodoList(todoList.filter((todoItem) => todoItem.todo_id !== deletedTodo.data.todo_id));
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo.description}
          onChange={(event) => setTodo({ ...todo, description: event.target.value })}
        />
        <button type="submit">Add Todo</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ol>
        {todoList.map((todoItem) => (
          <li
            key={todoItem.todo_id}
            onClick={() => {
              handleDelete(todoItem.todo_id);
            }}
          >
            {todoItem.description}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default App;
