import ToDoInput from "./components/ToDoInput"
import ToDoList from "./components/ToDoList"
import {useState, useEffect} from 'react'
function App() {


  const [todos,setTodos] = useState([])

  const [todoValue, setTodoValue] = useState('')

  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({ todos:newList }))
  }

  function handleAddTodos(newTodo) {
    const newTodoList = [...todos, newTodo]
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function deleteTask(index) {
    const updatedTodos = todos.filter((_, i) => i !== index);
    persistData(updatedTodos)
    setTodos(updatedTodos);
  }

  function editTask(index) {
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    deleteTask(index)
  }

  useEffect(()=>{
    if(!localStorage){
      return
    }

    let localTodos = localStorage.getItem('todos')

    if(!localTodos){
      return
    }
    localTodos=JSON.parse(localTodos).todos
    setTodos(localTodos)
  },[])
  
  return (
    <>
      <ToDoInput handleAddTodos={handleAddTodos} todoValue={todoValue} setTodoValue={setTodoValue}/>
      <ToDoList todos={todos}  deleteTask={deleteTask} editTask={editTask}/>
    </>
  )
}

export default App
