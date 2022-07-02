const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES
app.get("/distance", async(req,res) => {
    try{
        const response = await pool.query("SELECT * FROM distance")
        res.json(response.rows);
    }catch(err) {
        console.error(err.message);
    }
})

app.listen(4000, () =>{
    console.log("server has started on port 4000");
});