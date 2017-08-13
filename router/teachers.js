const express = require('express');
const router = express.Router();

const pret = require('../models');


//-------------------------------GET DATA AWAL--------------------------
router.get('/', (req, res)=>{
  pret.Teacher.findAll()
  .then(rowsTeachers=>{
    // res.send('ogi')
    res.render('teachers',{dataTeachers: rowsTeachers})
  })
})


//-----------------------------------EDIT--------------------------------

router.get('/edit/:id', (req, res)=>{
  pret.Teacher.findById(req.params.id)
  .then(rowsTeachers=>{
    // rowsStudents['full_name']=
    // res.send('ogi')
    res.render('editteacher',{dataTeachers: rowsTeachers,err_msg:false, mail:false})
    // console.log(dataStudents);
  })
  .catch(err=>{
    console.log("ada error di get edit teacher");
  })
})

router.post('/edit/:id', (req, res)=>{

    pret.Teacher.update({
      first_name : req.body.first_name,
      last_name : req.body.last_name,
      email : req.body.email,
      updatedAt : new Date(),
      createdAt : new Date()
    },{
      where:{id: req.params.id}
    })

    .then(rowsTeachers =>{
      res.redirect('/teachers')
      })

    .catch(err=>{
      // console.log("ada error di get update student");
      pret.Student.findById(req.params.id)
      .then(rowsTeachers=>{
        res.render('editteacher',{dataTeachers: rowsTeachers,err_msg:'Format Email salah!'})
      })
    })
})

//------------------------------  ADD  --------------------------------
router.get('/addteachers/', (req, res)=>{
    res.render('addteachers',{err_msg:false})
})

router.post('/addteachers', (req, res)=>{

    pret.Teacher.create({
      first_name : req.body.first_name,
      last_name : req.body.last_name,
      email : req.body.email,
      updatedAt : new Date(),
      createdAt : new Date()

  })
  .then(rowsTeachers => {
    res.redirect('/teachers')
  })
  .catch(err=>{
    // console.log("ada error di get update student");
      res.render('addteachers',{err_msg:'Format Email salah!'})
    })
})

//-------------------------------DELETE--------------------------------
router.get('/delete/:id', (req, res)=>{
  pret.Teacher.destroy({
    where: {
      id : req.params.id
    }
  })
  .then(udahdelete=>{
    res.redirect('/teachers')
  })
})

//---------------------------------------------------------------------





module.exports = router
