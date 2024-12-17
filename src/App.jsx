import React, { useState, useEffect } from "react";
import ToDoList from "./components/ToDoList";
import category from "./assets/category.json";
import ToDoInput from "./components/ToDoInput";

function App() {
  const [steps, setSteps] = useState([]);
  const [actorValue, setActorValue] = useState("");
  const [actionValue, setActionValue] = useState("");

  useEffect(() => {
    if (category?.scenario?.steps) {
      setSteps(category.scenario.steps);
    }
  }, []);

  // Recalculate indexes after reordering
  function recalculateIndexes(updatedSteps) {
    function updateIndexes(steps, parentId = null) {
      return steps.map((step, index) => {
        const newId = parentId ? `${parentId}.${index + 1}` : `${index + 1}`;
        const updatedSubSteps = step.steps
          ? updateIndexes(step.steps, newId)
          : [];
        return { ...step, id: newId, steps: updatedSubSteps };
      });
    }
    return updateIndexes(updatedSteps);
  }

  // Add a new step
  function handleAddStep() {
    const newStep = {
      id: `${steps.length + 1}`,
      actor: actorValue || "Unknown Actor",
      action: actionValue || "No Action Provided",
      steps: [],
    };
    const updatedSteps = [...steps, newStep];
    setSteps(updatedSteps);
    setActorValue("");
    setActionValue("");
  }

  // Add a substep
  function addSubStep(parentIndex, actor, action, parentId = null) {
    const updateSteps = (steps, targetId) => {
      return steps.map((step) => {
        if (step.id === targetId) {
          const newSubStep = {
            id: `${step.steps.length + 1}`,
            actor: actor || "Unknown Actor",
            action: action || "No Action Provided",
            steps: [],
          };
          return { ...step, steps: [...step.steps, newSubStep] };
        } else if (step.steps) {
          return { ...step, steps: updateSteps(step.steps, targetId) };
        }
        return step;
      });
    };
  
    const updatedSteps = parentId
      ? updateSteps(steps, parentId)
      : steps.map((step, index) => {
          if (index === parentIndex) {
            const newSubStep = {
              id: `${step.steps.length + 1}`,
              actor: actor || "Unknown Actor",
              action: action || "No Action Provided",
              steps: [],
            };
            return { ...step, steps: [...step.steps, newSubStep] };
          }
          return step;
        });
  
    setSteps(updatedSteps);
  }
  

  // Handle drag and drop for reordering steps
  function reorderSteps(draggedIndex, droppedIndex) {
    const updatedSteps = [...steps];
    const [removed] = updatedSteps.splice(draggedIndex, 1);
    updatedSteps.splice(droppedIndex, 0, removed);
    const recalculatedSteps = recalculateIndexes(updatedSteps);
    setSteps(recalculatedSteps);
  }

  // Export to JSON
  function exportSteps() {
    const jsonData = { scenario: { ...category.scenario, steps } };
    const jsonString = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "export.json";
    link.click();
  }

  return (
    <div>
      <header>
          <ToDoInput
            handleAddStep={handleAddStep}
            actorValue={actorValue}
            setActorValue={setActorValue}
            actionValue={actionValue}
            setActionValue={setActionValue}
          />
        <button onClick={exportSteps}>Export to JSON</button>
      </header>
      <h1>Scenario Quality Checker</h1>
      <h2>Scenario name:{category?.scenario?.name}</h2>
      <h3>Scenario actors:  {category?.scenario?.actors?.map((actor, index) => (
    <h4 key={index}>{actor}{index < category?.scenario?.actors.length - 1 ? ', ' : ''}</h4>
  ))}</h3>
      <h3>Scenario name:{category?.scenario?.description}</h3>
      <ToDoList
        steps={steps}
        setSteps={setSteps}
        reorderSteps={reorderSteps}
        addSubStep={addSubStep}
      />
    </div>
  );
}

export default App;
