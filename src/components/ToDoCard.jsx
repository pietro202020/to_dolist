import React, { useState } from "react";

export default function ToDoCard({ step, parentIndex, addSubStep }) {
  const [subActor, setSubActor] = useState("");
  const [subAction, setSubAction] = useState("");

  return (
    <div className="todoItem" style={{ marginLeft: "20px" }}>
      <p>
        <strong>{step.id}</strong>: {step.actor} - {step.action}
      </p>

      {/* Substeps */}
      <div className="substeps">
        {step.steps.map((subStep, index) => (
          <ToDoCard
            key={subStep.id}
            step={subStep}
            parentIndex={index}
            addSubStep={(childIndex, actor, action) =>
              addSubStep(parentIndex, actor, action, subStep.id)
            }
          />
        ))}
      </div>

      {/* Add Substep Inputs */}
      <div className="actionsContainer">
        <input
          type="text"
          placeholder="Substep Actor"
          value={subActor}
          onChange={(e) => setSubActor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Substep Action"
          value={subAction}
          onChange={(e) => setSubAction(e.target.value)}
        />
        <button
          onClick={() => {
            addSubStep(parentIndex, subActor, subAction);
            setSubActor("");
            setSubAction("");
          }}
        >
          Add Substep
        </button>
      </div>
    </div>
  );
}
