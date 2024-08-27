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

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});