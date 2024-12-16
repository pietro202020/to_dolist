import React from "react";

export default function ToDoCard({ todo, todoIndex, deleteTask, editTask }) {
  return (
    <div className="todoItem">
        
      <p>{todo}</p>
      <div className="actionsContainer">
        <button onClick={() => deleteTask(todoIndex)}>
          <i className="fa-solid fa-trash"></i> Delete
        </button>
        <button onClick={() => editTask(todoIndex)}>
          <i className="fa-solid fa-pen-to-square"></i> Edit
        </button>
      </div>
    </div>
  );
}
