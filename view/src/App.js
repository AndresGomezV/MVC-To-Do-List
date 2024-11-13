import React, { useState, useEffect } from "react";
import "./App.css";
import { getTodos, createTodo, removeTodo } from "./util";

const App = () => {
  const [todo, setTodo] = useState({
    description: "",
  });
  const [todoList, setTodoList] = useState();
  const [error, setError] = useState();

  // Create a fetchTodos() function to update the View from Model using getTodos() function from Controller
  const fetchTodos = async () => {
    try {
      const res = await getTodos();
      /* No es necesario usar return con setTodoList a menos que quieras devolver el resultado de setTodoList, lo cual generalmente no es necesario ya que setTodoList es una función de actualización de 
      estado.*/
      if (res.error) {
        setError(res.error.name);
      } else {
        setTodoList(res.data);
      }
    } catch (error) {
      setError(error);
    }
  };

  // Create a handleDelete() function to remove to-do list with matching id
  const handleDelete = async (id) => {
    try {
      await removeTodo(id);
      fetchTodos();

    } catch (error) {
      setError(error);
    }
  };


  // Create a handleSubmit() function to add new to-do list
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    setError(); // Resetea cualquier error previo
    const data = new FormData(e.currentTarget); // Crea un objeto FormData con los datos del formulario
    try {
      data.set('description', todo.description); // Establece la descripción del todo
      data.set('created_at', `${new Date().toISOString()}`); // Establece la fecha de creación
      const newTodo = await createTodo(data); // Llama a createTodo para enviar los datos
      if (newTodo.error) {
        setError(newTodo.error); // Maneja el error si existe
      } else {
        setTodo({ description: '' }); // Resetea el estado del todo
        fetchTodos(); // Actualiza la lista de tareas
      }
    } catch (err) {
      setError(err); // Maneja cualquier error inesperado
    }
  };
  

  useEffect(() => {
    // Initialize todoList
  }, []);
  return (
    <div className="App">
      <h1>To-Do List</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={todo.description}
          onChange={(event) =>
            setTodo({ ...todo, description: event.target.value })
          }
        ></input>
        <button type="submit">Add Todo</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ol>
        {todoList?.map((todoItem) => (
          <li
            key={todoItem.todo_id}
            onClick={() => {
              handleDelete(todoItem.todo_id);
            }}
          >
            {todoItem.description}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default App;
