import React from "react";
import ToDoCard from "./ToDoCard";

export default function ToDoList({ todos, deleteTask, editTask, reorderTodos }) {
  const handleDragStart = (event, index) => {
    event.dataTransfer.setData("text/plain", index); // Store the dragged item's index
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // Prevent default behavior to allow drop
  };

  const handleDrop = (event, dropIndex) => {
    const draggedIndex = parseInt(event.dataTransfer.getData("text/plain"), 10);
    if (draggedIndex !== dropIndex) {
      reorderTodos(draggedIndex, dropIndex);
    }
    event.dataTransfer.clearData();
  };

  return (
    <ul className="main">
      {todos.map((todo, index) => (
        <li
          key={index}
          draggable
          onDragStart={(event) => handleDragStart(event, index)}
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, index)}
        >
          <ToDoCard
            todo={todo}
            todoIndex={index}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        </li>
      ))}
    </ul>
  );
}
