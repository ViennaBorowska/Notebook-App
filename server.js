//Declare variable for PORT
const PORT = process.env.PORT || 3001;

//Package requires
const fs = require('fs');
const path = require('path');
const express = require('express');
//Express variable
const app = express();

//File requires
const savedNotes = require('./db/db.json');

//Express set-up
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//Routing get requests
app.get('/api/notes', (req, res) => {
  res.json(savedNotes.slice(1));
});
// Set homepage path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});
//Set note html path
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});
// Set random paths to homepage
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

//Make a new note
function generateNote(body, notesArr) {
  const note = body;
  if (!Array.isArray(notesArr)) notesArr = [];

  if (notesArr.length === 0) notesArr.push(0);

  body.id = notesArr[0];
  notesArr[0]++;

  notesArr.push(note);

  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(notesArr, null, 2)
  );

  return note;
}

//POST request to add new note to page
app.post('/api/notes', (req, res) => {
  const newNote = generateNote(req.body, savedNotes);
  res.json(newNote);
});

//Delete a note
function noteDelete(id, notesArr) {
  for (let i = 0; i < notesArr.length; i++) {
    let note = notesArr[i];

    if (note.id == id) {
      notesArr.splice(i, 1);
      fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArr, null, 2)
      );

      break;
    }
  }
}
app.delete('/api/notes/:id', (req, res) => {
  noteDelete(req.params.id, savedNotes);
  res.json(true);
});

//Start server
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
