import React from 'react'
import { useState } from 'react'
import '../App.css'
import styles from './TodoForm.module.css'
import commonStyles from './Common.module.css'

const TodoForm = ({addTodo}) => {

    const [value, setValue] = useState("");
    const [category, setCategory]= useState("");
    const [errorValue, setErrorValue] = useState("");
    const [errorCategory, setErrorCategory] = useState("");

    const handleSubmit = (e)=>{
        e.preventDefault()
        setErrorValue("")
        setErrorCategory("")
        if (value.length < 2) {
            setErrorValue("O título deve conter pelo menos 2 caracteres");
            return;
          }
        if (category == "") {
            setErrorCategory("Escolha uma categoria");
        return;
        }
        if(!value || !category) return;
        addTodo(value, category)
        setValue("")
        setCategory("")
    }

  return (
    <div className={styles['todo-form']}>
        <h2>Criar tarefa</h2>

        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Digite o título..."
            value={value}
            onChange={(e)=> setValue(e.target.value)} 
            className={commonStyles['input-select-common']}
            />
            {errorValue && <p className={styles.error}>{errorValue}</p>}

            <select value={category} onChange={(e)=> setCategory(e.target.value)} className={commonStyles['input-select-common']}>
                <option value="">Selecione uma categoria</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Pessoal">Pessoal</option>
                <option value="Estudos">Estudos</option>
            </select>
            {errorCategory && <p className={styles.error}>{errorCategory}</p>}

            <button className={styles.button} type="submit">Criar tarefa</button>
        </form>
    </div>
  )
}

export default TodoForm