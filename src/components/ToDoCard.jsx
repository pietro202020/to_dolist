import React from 'react'

export default function ToDoCard(props) {
    const {children, todoIndex, deleteTask, editTask} = props
  return (
    <li className='todoItem'>
        {children}
        <div className='actionsContainer'>
            <button onClick={()=>deleteTask(todoIndex)}>
                <i className="fa-solid fa-trash"></i>
            </button>
            <button onClick={()=>editTask(todoIndex)}>
                <i className="fa-solid fa-pen-to-square"></i>
            </button>
        </div>
    </li>
  )
}
