const Router = require("express");
const pool = require("./db.js")
const router = new Router();
const queriesController = require("./queriesController")

//ROUTES
router.get("/distance", async (req, res) => {
   let sqlQuery = "SELECT * FROM distance";
   let rowsPerPage = req.query.rowsPerPage;
   let input = req.query.inputQuery;
   let column = req.query.selectedColumn;
   let method = req.query.selectedMethod;
   //выставляем наш sql запрос согласно input в клиентской части
   if (column === "name") {
      if (method === "includes") {
         sqlQuery = `SELECT * FROM distance WHERE name iLIKE '%${input}%'`
      } else {
         if (input !== "") sqlQuery = `SELECT * FROM distance WHERE name = '${input}'`
      }
   }
   if (column === "amount" || column === "distance") {
      if (method === "includes") {
         sqlQuery = `SELECT * FROM distance WHERE ${column} iLIKE '%${input}%'`
      } else if (method === "equals") {
         if (input !== "") sqlQuery = `SELECT * FROM distance WHERE ${column} = '${input}'`
      } else if (method === "more") {
         if (input !== "") sqlQuery = `SELECT * FROM distance WHERE ${column} > '${input}'`
      } else if (method === "less") {
         if (input !== "") sqlQuery = `SELECT * FROM distance WHERE ${column} < '${input}'`
      }
   }

   // непосрдественно сам запрос с уже выставленным запросом для получения отфильтрованных данных
   pool.query(sqlQuery, (err, result) => {
      if (err) throw err;

      const numOfResults = result.rows.length;
      const numberOfPages = Math.ceil(numOfResults / rowsPerPage);
      let page = req.query.currentPage;

      //Determine the sql LIMIT starting number
      const startingLimit = (page - 1) * rowsPerPage;

      //Get the relevant number of ROWS for this tarting page
      sqlQuery = sqlQuery + ` OFFSET ${startingLimit} LIMIT ${rowsPerPage}`;
      pool.query(sqlQuery, (err, result) => {
         if (err) throw err;
         res.send({ result, numberOfPages });
      });
   })
})

router.post("/distance", (req, res) => {
   const { date, name, amount, distance } = req.query;
   const postQuery = `INSERT INTO distance (date, name, amount, distance) VALUES ('${date}', '${name}', ${amount}, ${distance})`
   pool.query(postQuery, (err, result) => {
      if (err) throw err;
      res.status(200).send("New data has been added")
   })
});

module.exports = router;