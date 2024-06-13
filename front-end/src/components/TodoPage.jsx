import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Search from './Search';
import Filter from './Filter';
import Todo from './Todo';
import styles from './Common.module.css';

function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Asc');

  useEffect(() => {
    console.log('useEffect chamado');
    fetchTodos();
  }, []); // Carregar os todos uma vez quando o componente montar

  const fetchTodos = async () => {
    console.log('fetchTodos chamado');
    try {
      const response = await fetch('http://localhost:3000/todos', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Enviar token JWT no header
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      console.log('Todos recebidos:', data);
      setTodos(Array.isArray(data) ? data : []); // Verificação adicional para garantir que 'data' seja um array
    } catch (error) {
      console.error('Error fetching todos:', error);
      setTodos([]); // Definir como array vazio em caso de erro
    }
  };

  const addTodo = async (text, category) => {
    console.log('addTodo chamado');
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
      console.log('Todo adicionado:', newTodo);
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const removeTodo = async (id) => {
    console.log('removeTodo chamado');
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
      console.log('Todo removido:', id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const completeTodo = async (id) => {
    console.log('completeTodo chamado');
    try {
      const response = await fetch(`http://localhost:3000/alterar/todo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ isCompleted: true }), // Assumindo que a API espera um objeto com isCompleted
      });
      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
      const updatedTodo = await response.json();
      console.log('Todo atualizado:', updatedTodo);
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  console.log('Renderizando TodoPage');
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
                completeTodo={completeTodo}
              />
            ))
        ) : (
          <p>No todos found</p>
        )}
      </div>
    </div>
  );
}

export default TodoPage;
