import React from 'react';
import '../App.css'
import styles from './Todo.module.css'

const Todo = ({todo, removeTodo, completeTodo}) => {
  return (
    <div className={styles.todo} style={{textDecoration: todo.isCompleted ? "line-through" : ""}}>
        <div className="content">
            <p>{todo.text}</p>
            <p className="category" style={{color: todo.category === "Trabalho" ? "#ff0000" : todo.category === "Estudos" ? "#3d54d8" : "#2ab441"}}>{todo.category}</p>
        </div>
        <div>
            <button className={styles.complete} onClick={()=> completeTodo(todo.id)}>Completar</button>
            <button className={styles.remove} onClick={()=> removeTodo(todo.id)}>X</button>
        </div>
    </div>
  )
}

export default Todo;
