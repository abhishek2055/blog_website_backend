import mysql from "mysql2"

export const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "@sDf1234->$",
    database: "blog"
})

