const express = require('express');
const router = express.Router();

const pret = require('../models');


router.get('/', (req, res)=>{
  pret.Subjects.findAll()
  .then(rowsSubjects=>{
    // res.send('ogi')
    res.render('subjects',{dataSubjects: rowsSubjects})
  })
  // subjects_model.findAll(connection, (err, rowsContacts)=>{
  //   res.render('teachers', {data:rowsContacts})
  // })
})

module.exports = router
