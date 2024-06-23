import React, {useState} from 'react'

export default function ToDoInput(props) {
    const { handleAddTodos, todoValue, setTodoValue } = props
  return (
    <header>
        <input 
            placeholder="Enter what you want to do..."
            value={todoValue}
            onChange={(e)=>{
                setTodoValue(e.target.value)
            }}
        />
        <button onClick={()=>{
            handleAddTodos(todoValue)
        }}>Add</button>
    </header>
  )
}
