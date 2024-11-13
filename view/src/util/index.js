/*View Utils (view/src/utils/index.js):

Contiene funciones utilitarias para la vista.
Realiza llamadas a la API para interactuar con el backend.
Define funciones para crear, obtener, y eliminar tareas desde el frontend.
Se enfoca en la comunicación con el controlador a través de solicitudes HTTP.
*/

export const createTodo = async (todo) => {
  try {
    const result = await fetch("/api/todo/create", {
      method: "POST",
      body: todo,
    });
    return result.json();
  } catch (error) {
    return {
      error,
    };
  }
};

export const getTodos = async () => {
  try {
    const result = await fetch("/api/todos");
    return result.json();

    //  const data = await result.json();
    // return data;
    /* se usaria una variable intermedia y el await, si es necesario modificar los datos de result antes de devolverlos*/
  } catch (error) {
    return {
      error,
    };
  }
};

export const removeTodo = async (id) => {
  try {
      await fetch (`/api/todo/${id}`, {
          method: "DELETE"
      });
      return 'deleted';
  } catch (error) {
    return {
        error,
    };
  }
};


/* export const createTodo = async (todo) => { esta sintaxis de export se usa en front-end (sistema de modulos de ES6*/