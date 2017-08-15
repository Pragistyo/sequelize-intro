const express = require('express');
const router = express.Router();

const dbs = require('../models');

//---------------------------SESSION PROTECTION------------------------------

router.use((req,res,next)=>{
  if((req.session.Login) && (req.session.role === 'headmaster' || req.session.role === 'academic')){
    next()
  }
  else{
    res.redirect('/')
  }
})


//---------------------------GET DATA AWAL-----------------------------------
router.get('/', (req, res)=>{
  dbs.Subjects.findAll({include:[dbs.Teacher]})
  .then(rowsSubjects=>{
    // res.send(rowsSubjects[0].Teachers)
    res.render('subjects',{dataSubjects: rowsSubjects})
  })
  // subjects_model.findAll(connection, (err, rowsContacts)=>{
  //   res.render('teachers', {data:rowsContacts})
  // })
})

module.exports = router
