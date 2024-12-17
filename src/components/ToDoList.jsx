import React from "react";
import ToDoCard from "./ToDoCard";

export default function ToDoList({ steps, reorderSteps, addSubStep }) {
  const handleDragStart = (event, index) => {
    event.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, dropIndex) => {
    const draggedIndex = parseInt(event.dataTransfer.getData("text/plain"), 10);
    if (draggedIndex !== dropIndex) {
      reorderSteps(draggedIndex, dropIndex);
    }
  };

  return (
    <ul className="main">
      {steps.map((step, index) => (
        <li
          key={step.id}
          draggable
          onDragStart={(event) => handleDragStart(event, index)}
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, index)}
        >
          <ToDoCard
            step={step}
            parentIndex={index}
            addSubStep={addSubStep}
          />
        </li>
      ))}
    </ul>
  );
}
