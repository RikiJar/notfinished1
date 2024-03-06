const mysql = require('./db');
const express = require('express');

const app = express();
app.use(express.json())

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => { console.log("Server started on port " + PORT) });

app.get("/boardData", (req, res) => {
  mysql.query("SELECT * FROM lobbies", (err, results, fields) => {
    if (err){
      res.status(400).send(err);
    }
    else {
      res.status(200).send(results);
    }
  })
});

app.post("/boardData", (req, res) => {
  let bodyJson = req.body;
  let lobbyId = bodyJson.lobbyId;
  let gameData = bodyJson.gameData;
  mysql.query(`UPDATE lobbies SET gameData = '${gameData}' WHERE lobbyId = ${lobbyId};`, (err, results) => {
    if (err)
    {
      res.status(400).send(err);
    } else {
      res.status(200).send(results);
    }});
});