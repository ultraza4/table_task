const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "123",
    port: 5432,
    database: "worktask"
});

module.exports = pool;
