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

//Routing
//GET requests
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
