const createTodo = (todo) => {
    return fetch('/api/todo/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    })
        .then((response) => response.json())
        .catch((err) => console.log(err));
};

const getTodos = () => {
    return fetch('/api/todos', {
        method: 'GET',
    })
        .then((response) => response.json())
        .catch((err) => console.log(err));
};

const removeTodo = (id) => {
    return fetch(`/api/todo/${id}`, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .catch((err) => console.log(err));
};

const updateTodo = (id, form) => {
    return fetch(`/api/todo/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, form }),
    })
        .then((response) => response.json())
        .catch((err) => console.log(err));
};

export { createTodo, getTodos, removeTodo, updateTodo };
