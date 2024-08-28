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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

async function checkUsers(){
    const result = await db.query(`SELECT * FROM users`);
    let users = [];
    result.rows.forEach((user) => {
        users.push(user);
    });
    return users;
}

async function checkNotes(user_id) {
    const result = await db.query(`SELECT * FROM notes WHERE user_id = ${user_id}`);
    let notes = [];
    result.rows.forEach((note) => {
        notes.push(note);
    });
    return notes;
}

app.get("/", async (req,res) => {
    const users = await checkUsers();
    const notes = await checkNotes(currentUserId);
    res.render("index.ejs", {
        users: users,
        notes: notes
    });
});

app.post("/user", async (req,res) => {
    if(req.body["user"]){

    }else if(req.body["add"]){
        res.render("user.ejs");
    }
});

app.post("/register", async (req,res) => {
    try {
        await db.query(`INSERT INTO users(name) VALUES('${req.body["name"]}')`);
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});