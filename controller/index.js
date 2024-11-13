const formidable = require("formidable"); //we will use to parse our PostgreSQL data.
const { create, get, remove } = require("../model/todo");

exports.create = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields) => {
    const { description } = fields;
    // check to see if the description field exists in the form
    // if description doesn't exist, send error
    if (!fields.description) {
      return res.status(400).json({
        error: "Description is required",
      });
    }
    // if description exists, add to database using create() function
    try {
      const newTask = await create(description);
      return res.status(201).json({ data: newTask.rows[0] })
    } catch (error) {
      // if description cannot be added to database, send error
      return res.status(400).json({
        error,
      });
    }
  });
};


exports.read = async (req, res) => {
    try {
        const allTasks = await get();
        return res.status(200).json({ data: allTasks.rows });
    } catch(error) {
        return res.status(400).json({
            error,
        });
    }
};


exports.removeTodo = async (req, res) => {
    const id = Number(req.params.id);
    try {
        await remove(id);
        return res.status(200).json({ data: id });

    } catch(error) {
        return res.status()
    }
};.

/*Controller (controller/index.js):

Actúa como intermediario entre el modelo y la vista.
Maneja la lógica de negocio y las solicitudes HTTP.
Importa funciones del modelo para interactuar con la base de datos.
Define funciones para crear, leer, y eliminar tareas, y las exporta para ser usadas en las rutas.
/*