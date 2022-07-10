const pool = require("./db.js");

class queriesController {
   async create(req, res) {
      const { date, name, amount, distance } = req.body;
      pool.query(`INSERT INTO users (date, name, amount, distance) VALUES (${date}, ${name}, ${amount}, ${distance}) RETURNING *`,
         [date, name, amount, distance], (err, result) => {
            if (err) throw err;
            res.status(200).send(`Distnace added with ID: ${result.rows[0].id}`)
         })
   }
}

module.exports = new queriesController();