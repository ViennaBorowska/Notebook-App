//Declare variable for PORT
const PORT = process.env.PORT || 3001;

//Package requires
const fs = require('fs');
const path = require('path');
const express = require('express');

//File requires
const savedNotes = require('./db/db.json');
const { builtinModules } = require('module');

//Global variables
const app = express();
