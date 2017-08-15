const express = require('express');
const router = express.Router();

const dbs = require('../models');

//------------------------------SESSION PROTECTION----------------------------

router.use((req,res,next)=>{
  if(req.session.role === 'headmaster' && (req.session.Login)){
    next()
  }
  else{
    res.redirect('/')
  }
})


//-------------------------------GET DATA AWAL--------------------------
router.get('/', (req, res)=>{
  dbs.Teacher.findAll({include:[dbs.Subjects]})
  .then(rowsTeachers=>{
    // for (var i = 0; i < rowsTeachers.length; i++) {
    //   if(rowsTeachers[i].Subject.subject_name!= undefined){
    //     rowsTeachers[i].subject= rowsTeachers[i].Subject.subject_name
    //   }// res.send(rowsTeachers[0].Subject.subject_name)
    // }
    res.render('teachers',{dataTeachers: rowsTeachers})
  })
})


//-----------------------------------EDIT--------------------------------

router.get('/edit/:id', (req, res)=>{
  dbs.Teacher.findById(req.params.id)
  .then(rowsTeachers=>{
    dbs.Subjects.findAll()
    .then(rowsSubjects=>{
      // res.send(rowsSubjects)
      res.render('editteacher',{dataTeachers: rowsTeachers,dataSubjects:rowsSubjects,err_msg:false})
    })
  })
  .catch(err=>{
    console.log("ada error di get edit teacher");
  })
})

router.post('/edit/:id', (req, res)=>{

        dbs.Teacher.update({
          first_name : req.body.first_name,
          last_name : req.body.last_name,
          email : req.body.email,
          subjectId: req.body.subjectId,
          updatedAt : new Date(),
          createdAt : new Date()
        },{
          where:{id: req.params.id}
        })

        .then(rowsTeachers =>{
          res.redirect('/teachers')
          // res.send(rowsTeachers)

          })

        .catch(err=>{
          // console.log("ada error di get update student");
          dbs.Teacher.findById(req.params.id)
          .then(rowsTeachers=>{
            // res.send(err)
            res.render('editteacher',{dataTeachers: rowsTeachers, err_msg: err.errors[0].message})
          })
    })
  })

//------------------------------  ADD  --------------------------------
router.get('/addteachers/', (req, res)=>{
  dbs.Subjects.findAll()
  .then(rowsSubjects=>{
    res.render('addteachers',{dataSubjects:rowsSubjects,err_msg:false})
  })
})


router.post('/addteachers', (req, res)=>{

    dbs.Teacher.create({
      first_name : req.body.first_name,
      last_name : req.body.last_name,
      email : req.body.email,
      subjectId : req.body.subjectId,
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
  dbs.Teacher.destroy({
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
