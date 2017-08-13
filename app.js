const express = require('express')
const app = express()
const bodyParser = require('body-parser');
// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('./db/data.db')
// const db_model_model = require('./model/db_model.js');
// const contacts_model = require('./model/contacts.js');
// const address_model = require('./model/address.js');

const index_router = require('./router/index');
const teachers_router = require('./router/teachers');
const subjects_router = require('./router/subjects');
const students_router = require('./router/students');


app.use(bodyParser.urlencoded({
  extended:true
}));
app.set('view engine', 'ejs');

app.use('/', index_router);
app.use('/teachers', teachers_router);
app.use('/subjects', subjects_router);
app.use('/students', students_router);

// app.use('')
// app.use('')


app.listen(3000, function(){
  console.log("Port 3000 Opened");
});
