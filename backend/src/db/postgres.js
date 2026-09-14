import pg from "pg";
const { Pool } = pg;
const pool = new Pool({
    host: "localhost",
    port: 5432,
    database: "cloudDb",
    user: "cloudos",
    password: "milesraj"
});
export default pool;
pool.query("SELECT 1")
    .then(() => console.log("PostgreSQL pool works"))
    .catch(err => console.error("PostgreSQL pool error:", err));