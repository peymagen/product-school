import mysql from "mysql2/promise";

// Create a pool to the MySQL database
export const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "school_db",
  port: Number(process.env.DB_PORT) || 3306,
  multipleStatements: true,
  waitForConnections: true,
});
