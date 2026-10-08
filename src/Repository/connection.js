import mysql from "mysql2/promise.js";

const con = mysql.createPool({
    user: process.env.USER_DB,
    password: process.env.PWD_BD,
    host: process.env.HOST_DB,
    port: process.env.PORT_DB,
    database: process.env.DATABASE_BD,

    ssl: {
        rejectUnauthorized: false
    },

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

    typeCast: function (field, next) {
        if (field.type === "TINY" && field.length == 1) {
            return field.string() === "1";
        }
        else if (field.type.includes("DECIMAL")) {
            return Number(field.string());
        }
        else {
            return next();
        }
    }
});

export default con;