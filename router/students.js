const express = require('express');
const router = express.Router();

const dbs = require('../models');
// const teachers_model = require('../models/teacher.js');

// let database_model= new DB_Model('./db/data.db')
// const connection = database_model.newdatabase


//-------------------------GET DATA AWAL--------------------------
router.get('/', (req, res)=>{
  dbs.Student.findAll()
  .then(rowsStudents=>{
    // res.send('ogi')
    for (var i = 0; i < rowsStudents.length; i++) {
      rowsStudents[i].dataValues.full_name= `${rowsStudents[i].dataValues.first_name} ${rowsStudents[i].dataValues.last_name}`
    }
    // console.log(rowsStudents);
    res.render('students',{dataStudents: rowsStudents})
  })
  .catch(err=>{
    console.log("ada error di get student");
  })
})

//----------------------------EDIT---------------------------------
router.get('/edit/:id', (req, res)=>{
  dbs.Student.findById(req.params.id)
  .then(rowsStudents=>{
    // rowsStudents['full_name']=
    // res.send('ogi')
    res.render('editstudent',{dataStudents: rowsStudents,err_msg:false, mail:false})
    // console.log(dataStudents);
  })
  .catch(err=>{
    console.log("ada error di get edit student");
  })
})

router.post('/edit/:id', (req, res)=>{

        dbs.Student.update({
          first_name : req.body.first_name,
          last_name : req.body.last_name,
          email : req.body.email,
          updatedAt : new Date(),
          createdAt : new Date()
        },{
          where:{id: req.params.id}
        })

        .then(rowsStudents =>{
          res.redirect('/students')
          })

        .catch(err=>{
          // console.log("ada error di get update student");
          dbs.Student.findById(req.params.id)
          .then(rowsStudents=>{
            res.render('editstudent',{dataStudents: rowsStudents,err_msg:'Format Email salah!'})
          })
    })
  })


//-------------------------ADD-------------------------------------
router.get('/addstudents/', (req, res)=>{
res.render('addstudents',{err_msg:false})
})

router.post('/addstudents', (req, res)=>{
  // if(req.body.email===){
  //   res.render('addstudents',{err_msg:'Email sudah terpakai !'})
  // }
  // else{
    dbs.Student.create({
      first_name : req.body.first_name,
      last_name : req.body.last_name,
      email : req.body.email,
      updatedAt : new Date(),
      createdAt : new Date()
  // }
  })
  .then(rowsStudents => {
    res.redirect('/students')
  })
  .catch(err=>{
    // console.log("ada error di get update student");
      res.render('addstudents',{err_msg:'Format Email salah!'})
    })
})

//-----------------------------DELETE-----------------------------
  router.get('/delete/:id', (req, res)=>{
    dbs.Student.destroy({
      where: {
        id : req.params.id
      }
    })
    .then(udahdelete=>{
      res.redirect('/students')
    })
  })
//----------------------------------------------------------------


// <% if(err_msg){ %>
//   <p> <%= err_msg %></p>
// <% } %>

module.exports = router
