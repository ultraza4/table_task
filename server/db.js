const Pool = require("pg").Pool;

// коннектимся к базе данных PostgresSQL с именем Пользователя и именем БД (в моем случае postgres и "worktask")  
const pool = new Pool({
    user: "postgres",
    password: "123",
    port: 5432,
    database: "worktask"
});

module.exports = pool;
