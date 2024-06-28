import React, { useState, useEffect } from 'react';
import TodoForm from '../components/TodoForm';
import Search from '../components/Search';
import Filter from '../components/Filter';
import Todo from '../components/Todo';
import styles from '../components/Common.module.css';

function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Asc');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:3000/todos', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      setTodos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setTodos([]);
    }
  };

  const addTodo = async (text, category) => {
    try {
      const response = await fetch('http://localhost:3000/cadastrar/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ text, category }),
      });
      if (!response.ok) {
        throw new Error('Failed to add todo');
      }
      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const removeTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/deletar/todo/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const toggleCompleteTodo = async (id, isCompleted) => {
    try {
      const response = await fetch(`http://localhost:3000/alterar/todo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ isCompleted: !isCompleted }),
      });
      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
      const updatedTodo = await response.json();
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className="app">
      <h1 className="title-box-listas">EasyTask</h1>

      <div className={styles.box}>
        <TodoForm addTodo={addTodo} />
      </div>

      <div className={styles.box}>
        <Search search={search} setSearch={setSearch} />

        <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
      </div>

      <div className="todo-list">
        {todos.length > 0 ? (
          todos
            .filter((todo) =>
              filter === 'All'
                ? true
                : filter === 'Completed'
                ? todo.isCompleted
                : !todo.isCompleted
            )
            .filter((todo) =>
              todo.text.toLowerCase().includes(search.toLowerCase())
            )
            .sort((a, b) =>
              sort === 'Asc' ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text)
            )
            .map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                removeTodo={removeTodo}
                completeTodo={() => toggleCompleteTodo(todo.id, todo.isCompleted)}
              />
            ))
        ) : (
          <div className={styles.notTodos}>
            <p>Não há tarefas cadastradas.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoPage;
