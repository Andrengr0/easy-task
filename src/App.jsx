import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/login/Login'
import Todo from "./components/Todo";
import './App.css'
import styles from './components/Common.module.css'
import TodoForm from './components/TodoForm';
import Search from './components/Search';
import Filter from './components/Filter';

function App() {

  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Criar funcionalidade X no sistema",
      category: "Trabalho",
      isCompleted: false
    },
    {
      id: 2,
      text: "Ir para a academia",
      category: "Pessoal",
      isCompleted: false
    },
    {
      id: 3,
      text: "Estudar React",
      category: "Estudos",
      isCompleted: false
    }
  ]);

  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RedirectToLogin />} />
        <Route path="/login" element={ <Login /> } />
        <Route path="/todo" element={ <TodoPage todos={todos} setTodos={setTodos} /> } />
      </Routes>
    </Router>
  )
}

  function RedirectToLogin() {
    const navigate = useNavigate();
    useEffect(() => {
      navigate('/login');
    }, [navigate]);
  
    return null;
  }

  function TodoPage({ todos, setTodos }) {

    const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc")

  const addTodo = (text, category) => {
    const newTodos = [
      ...todos,
      {
        id: Math.floor(Math.random() * 10000),
        text,
        category,
        isCompleted: false,
      },
    ]

    setTodos(newTodos);
  };

  const removeTodo = (id) => {
    const newTodos = [...todos]
    const filteredTodos = newTodos.filter((todo) =>
      todo.id !== id ? todo : null
    );
    setTodos(filteredTodos);
  };

  const completeTodo = (id)=> {
    const newTodos = [...todos]
    newTodos.map((todo)=> 
      todo.id === id ? todo.isCompleted = !todo.isCompleted : todo
    );
    setTodos(newTodos);
  }
  
    return (
      <div className="app">

            <h1 className='title-box-listas'>Lista de tarefas</h1>

            <div className={styles.box}>
              <TodoForm addTodo={addTodo} />
            </div>

            <div className={styles.box}>
            <Search search={search} setSearch={setSearch} />

            <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
            </div>

            <div className="todo-list">
              {todos
              .filter((todo)=> filter === "All" 
                ? true : filter === "Completed" 
                ? todo.isCompleted 
                : !todo.isCompleted
              )
              .filter((todo)=> 
                todo.text.toLowerCase().includes(search.toLowerCase())
              )
              .sort((a, b)=> 
                sort === "Asc" 
                  ? a.text.localeCompare(b.text) 
                  : b.text.localeCompare(a.text))
              .map((todo)=>(
                <Todo 
                  key={todo.id} 
                  todo={todo} 
                  removeTodo={removeTodo} 
                  completeTodo={completeTodo} 
                />
              ))}
            </div>

          </div>
    );
  }



export default App
