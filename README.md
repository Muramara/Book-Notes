# 📚 Book Notes

A simple application for tracking your book reading history, notes, and ratings.

It uses the openlibrary API to fetch book covers. This is accomplished by providing
the ISBN-10 value of the book being reviewed.

---

## 🔍 Overview

**Book Notes** is designed for book lovers who want to document their reading journey. It allows users to:

- 📖 Track books they've read  
- 📝 Add personal notes for each book  
- ⭐ Rate their reading experience  
- 🔢 Associate books with their ISBN  
- 🗓️ Organize reading history by date  

---

## 🗄️ Database Structure

The app uses a PostgreSQL relational database with two main tables:

### `users` Table

```sql
users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE
)
```

### `notes` Table

```sql
notes (
    id SERIAL PRIMARY KEY,
    isbn INT,
    title VARCHAR(45),
    date_read VARCHAR(50),
    notes VARCHAR(500),
    rating INT,
    user_id INT REFERENCES users(id) ON DELETE CASCADE
)
```
---

## ✨ Features

- User Management: Create and manage user profiles
- Book Tracking: Record books with title and ISBN
- Note Taking: Add up to 500 characters of notes per book
- Rating System: Assign ratings to remember favorite reads
- Reading History: Keep a timeline of when books were read
- User Association: Notes are linked to individual users

---

## 🚀 Getting Started

1. Clone the repository.

```bash
git clone https://github.com/your-username/book-notes.git
cd book-notes
```

2. **Set up ypur database**
    Use the provided SQL schema to create the required tables in PostgreSQL.

3. **Run the application**
   Depending on your tech stack (Node.js, JSP, etc.), start your server and access the app via `localhost`.

---

## 🛠️ Usage

- Add new users
- Record new book entries
- View all notes by user
- Search books by title or ISBN
- Filter by rating to find top reads

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the project, open issues, or submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.
