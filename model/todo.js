const pool = require("./database");

const create = (description) => {
    pool.query('INSERT INTO todo (description) VALUES ($1) RETURNING *', [description]);    
}
/* in the context of the project, where the goal is to manage operations through a controller, the simpler version of the create function is appropriate. This version focuses solely on interacting with the database and can be called from within the controller functions*/

/*
const create = (req, res) => {
    const { description } = req.body;

    pool.query('INSERT INTO todo (description) VALUES ($1) RETURNING *', [description], (error, results) => {
        if (error) {
            throw error
          }
          response.status(201).send(`To-Do Added, Description: ${results.rows[0].description}`);
    });   
}
This version could be used outside a MVC design pattern and is intended to be used if you’re directly handling HTTP requests in an Express route.
*/

const get = () => {
    pool.query('SELECT * FROM todo');
}


const remove = (id) => {
    pool.query("DELETE FROM todo WHERE todo_id = $1". [id]);
}

module.exports = { create, get, remove };