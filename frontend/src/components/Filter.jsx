import styles from "./Filter.module.css"
import '../App.css'
import commonStyles from "./Common.module.css"

const Filter = ({filter, setFilter, setSort}) => {
    return (
      <div>
          <h2>Filtrar:</h2>
          <div className={styles['filter-options']}>
              <div>
                  <p>Status:</p>
                  <select value={filter} onChange={(e)=> setFilter(e.target.value)} className={commonStyles['input-select-common']}>
                      <option value="All">Todas</option>
                      <option value="Completed">Completas</option>
                      <option value="Incompleted">Incompletas</option>
                  </select>
              </div>
              <div>
                  <p>Ordem alfabética:</p>
                  <button onClick={()=> setSort("Asc")}>A - Z</button>
                  <button onClick={()=> setSort("Desc")}>Z - A</button>
              </div>
          </div>
      </div>
    )
  }
  
  export default Filter