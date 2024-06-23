import React, {useState} from 'react'
import ToDoCard from './ToDoCard'

export default function ToDoList(props) {
  const {todos, deleteTask, editTask} = props  
  return (
    <ul className='main'>
        {todos.map((todo, todoIndex)=>{
            return (
                <ToDoCard key={todoIndex} todoIndex={todoIndex} deleteTask={deleteTask} editTask={editTask}>
                    <p>{todo}</p>
                </ToDoCard>
            )
        })}
    </ul>
  )
}
