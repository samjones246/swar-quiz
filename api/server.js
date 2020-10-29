const express = require('express')
const app = express()
const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')
const db = new sqlite3.Database('./swar-quiz.db', err => {
    if(err){
        return console.error(err.message)
    }
    console.log("Connected to sqlite database")
})
const PORT = 5000;
//app.use(cors);
app.get("/api/scores", (req, res) => {
    console.log("Request sent to /api/scores")
    db.serialize(() => {
        console.log("Retriving rows from db...")
        db.all('SELECT * FROM Scores', (err, rows) => {
            if (err) {
                console.error(err.message);
            }
            res.send(rows);
            console.log("Done.")
        });
    });
})
app.listen(PORT, () => console.log("API running on port " + PORT +": "))