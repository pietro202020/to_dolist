import React, {useState} from 'react'

export default function ToDoInput(props) {
    const { handleAddStep, actorValue, setActorValue, actionValue, setActionValue } = props
  return (
    <header>
        <input 
            placeholder="Actor"
            value={actorValue}
            onChange={(e)=>{
                setActorValue(e.target.value)
            }}
        />
        <input
            placeholder="Action"
            value={actionValue}
            onChange={(e) => setActionValue(e.target.value)}
        />
        <button onClick={()=>{
            handleAddStep()
        }}>Add</button>
    </header>
  )
}
