import ToDoInput from "./components/ToDoInput";
import ToDoList from "./components/ToDoList";
import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState(["Hahaha"]);
  const [todoValue, setTodoValue] = useState("");

  function persistData(newList) {
    localStorage.setItem("todos", JSON.stringify({ todos: newList }));
  }

  function handleAddTodos(newTodo) {
    const newTodoList = [...todos, newTodo];
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  function deleteTask(index) {
    const updatedTodos = todos.filter((_, i) => i !== index);
    persistData(updatedTodos);
    setTodos(updatedTodos);
  }

  function editTask(index) {
    const valueToBeEdited = todos[index];
    setTodoValue(valueToBeEdited);
    deleteTask(index);
  }

  function reorderTodos(startIndex, endIndex) {
    const updatedTodos = [...todos];
    const [removed] = updatedTodos.splice(startIndex, 1);
    updatedTodos.splice(endIndex, 0, removed);
    persistData(updatedTodos);
    setTodos(updatedTodos);
  }

  useEffect(() => {
    if (!localStorage) return;

    let localTodos = localStorage.getItem("todos");
    if (!localTodos) return;

    localTodos = JSON.parse(localTodos).todos;
    setTodos(localTodos);
    console.log(localTodos)
  }, []);

  return (
    <>
      <ToDoInput
        handleAddTodos={handleAddTodos}
        todoValue={todoValue}
        setTodoValue={setTodoValue}
      />
      <h1 className="header">Scenario quality checker</h1>
      <ToDoList
        todos={todos}
        deleteTask={deleteTask}
        editTask={editTask}
        reorderTodos={reorderTodos}
      />
    </>
  );
}

export default App;
