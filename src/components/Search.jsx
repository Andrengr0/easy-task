import React from 'react'
import '../App.css'
import styles from './Common.module.css'

const Search = ({search, setSearch}) => {
  return (
    <div className={styles['bottom-border']}>
        <h2>Pesquisar:</h2>
        <input type='text' value={search} onChange={(e)=> setSearch(e.target.value)} className={styles['input-select-common']} placeholder='Digite aqui...' />
    </div>
  )
}

export default Search