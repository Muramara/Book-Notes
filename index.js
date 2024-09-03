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
    const result = await db.query(`SELECT id FROM users WHERE name = '${req.body["user"]}'`);
    currentUserId = result.rows[0].id;
    res.redirect("/");
});

app.post("/addUser", async (req,res) => {
    res.render("user.ejs");
});
app.post("/register", async (req,res) => {
    try {
        await db.query(`INSERT INTO users(name) VALUES('${req.body["name"]}')`);
        res.redirect("/");
    } catch (error) {
        res.render("user.ejs", {
            error: 'Name already taken'
        });
    }
});

app.post("/addReview", (req,res) => {
    res.render("review.ejs", {
        user_id: currentUserId
    });
});
app.post("/review", async (req,res) => {
    const title = req.body["title"];
    const isbn = req.body["isbn"];
    const user_id = req.body["user_id"];
    const date = req.body["date"];
    const notes = req.body["notes"];
    const rating = req.body["rating"];

    try {
        const response = await axios.get(`https://covers.openlibrary.org/b/isbn/${isbn}.json`);
        const url = response.data.source_url

        try {
            await db.query('INSERT INTO notes (isbn, title, date_read, notes, rating, user_id, cover_url) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                [isbn, title, date, notes, rating, user_id, url]
            );
            res.redirect("/");
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        res.render("review.ejs", {
            user_id: currentUserId,
            message: 'Enter a different ISBN value'
        });
    }
});

app.post("/edit", (req, res) => {
    res.render("edit.ejs", {
        title: req.body["title"],
        isbn: req.body["isbn"],
        user_id: currentUserId,
        date: req.body["date"],
        notes: req.body["notes"],
        rating: req.body["rating"]
    });
});
app.post("/save", async (req,res) => {
    const title = req.body["title"];
    const isbn = req.body["isbn"];
    const user_id = req.body["user_id"];
    const date = req.body["date"];
    const notes = req.body["notes"];
    const rating = req.body["rating"];
    try {
        await db.query(`UPDATE notes
            SET isbn = ${isbn}, title = '${title}', date_read = '${date}',
                notes = '${notes}', rating = ${rating}
            WHERE user_id = ${user_id}`);
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
});

app.post("/delete", async (req,res) => {
    try {
        await db.query(`DELETE FROM notes WHERE id = ${req.body["note_id"]}`);
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});