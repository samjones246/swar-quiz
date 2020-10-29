const express = require('express')
const app = express()
const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')
const bodyParser = require('body-parser')
const db = new sqlite3.Database('./swar-quiz.db', err => {
    if(err){
        return console.error(err.message)
    }
    console.log("Connected to sqlite database")
})
const PORT = 5000;
app.use(cors());
app.use(bodyParser.json())
app.get("/scores", (req, res) => {
    console.log("Request sent to /api/scores")
    db.serialize(() => {
        console.log("Retriving rows from db...")
        db.all('SELECT * FROM Scores', (err, rows) => {
            if (err) {
                console.error(err.message);
            }
            if(rows){
                res.send(rows);
            }else{
                res.send("No scores saved")
            }
            console.log("Done.")
        });
    });
})
function checkParams(req, params){
    var result = null;
    for(param of params){
        var p = req.query[param] || req.body && req.body[param]
        console.log(p)
        if(p!=null){
            if(result === null){
                result = {}
            }
            if(!isNaN(p)) {
                result[param] = parseInt(p)
            } else {
                result[param] = p;    
            }
        }
    }
    return result;
}
app.post("/scores/save", (req, res) => {
    var params = checkParams(req, ["initials", "score", "attributesMask", "gradesMask"])
    if(params.score > 20){
        res.status(400).send("Invalid score, cheater!");
        return;
    }
    if(params){
        db.serialize(() => {
            db.get(`
            SELECT score FROM Scores 
            WHERE initials = ? 
            AND attributesMask = ?
            AND gradesMask = ?
            ;`, params.initials, params.attributesMask, params.gradesMask, 
            function(err, row){
                if(err){
                    res.status(500).send(err.message)
                    console.log(params)
                    return;
                }
                if(!row){
                    db.run(`
                    INSERT INTO Scores 
                        (initials, score, attributesMask, gradesMask)
                    VALUES 
                        (?, ?, ?, ?)
                    ;`, params.initials, params.score, params.attributesMask, params.gradesMask, 
                    function(err) {
                        if(err){
                            res.status(500).send(err.message);
                            console.log(params)
                            return;
                        }
                        res.send({best: true})
                    })
                }
                else if (row.score < params.score){
                    db.run(`
                    UPDATE Scores
                    SET 
                        score = ?
                    WHERE
                        initials = ?
                    AND attributesMask = ?
                    AND gradesMask = ?
                    ;`, params.score, params.initials, params.attributesMask, params.gradesMask, 
                    function(err){
                        if(err){
                            res.status(500).send(err.message);
                            console.log(params)
                            return;
                        }
                        res.send({best: true})
                    })
                }else{
                    res.send({best: false})
                }
            })
        })
    }else{
        res.status(400).send("Must supply score information in the query string or in the request body")
    }
})
app.post("/scores/delete", (req, res) => {
    var params = checkParams(req, ["initials", "gradesMask", "attributesMask"])
    if(params){
        db.run(`DELETE FROM Scores 
                WHERE 
                    initials = ? 
                AND gradesMask = ? 
                AND attributesMask = ?;
            `, params.initials, params.gradesMask, params.attributesMask, function(err) {
            if(err){
                res.status(500).send(err.message)
                return;
            }
            res.send("Score deleted")
        })
    }else{
        res.status(400).send("Must supply score ID in the query string or in the request body")
    }

})
app.listen(PORT, () => console.log("API running on port " + PORT +": "))
