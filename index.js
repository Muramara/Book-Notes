import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";

const app = express();
const port = 1300;
const db = new pg.Client({
    database: 'booknotes',
    host: 'localhost',
    user: 'postgres',
    password: 'number21@sm',
    port: 5432,
});
db.connect();

let currentUserId = 1;

async function checkUsers(){
    const result = await db.query(`SELECT * FROM users`);
    let users = [];
    result.rows.forEach((user) => {
        users.push(user);
    });
    return users;
}

app.get("/", async (req,res) => {
    const users = await checkUsers();
    res.render("index.ejs", {
        users: users
    });
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});