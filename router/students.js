const express = require('express');
const router = express.Router();

const dbs = require('../models');
// const teachers_model = require('../models/teacher.js');

// let database_model= new DB_Model('./db/data.db')
// const connection = database_model.newdatabase

//-------------------------PROTECTION SESSION------------------------------

router.use((req,res,next)=>{
  if((req.session.role) && (req.session.Login)){
    next()
  }
  else{
    res.redirect('/')
  }
})

//-------------------------GET DATA AWAL----------------------------------
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
    console.log(rowsStudents);
    res.render('editstudent',{dataStudents: rowsStudents,err:false,mail:false})
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
          // console.log(rowsStudents);
          // res.send(rowsStudents)
          })
        .catch(err=>{
          // console.log("ada error di get update student");
          dbs.Student.findById(req.params.id)
          .then(rowsStudents=>{
            // res.send(err)
            res.render('editstudent',{dataStudents: rowsStudents, err: err.errors[0].message})
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
      res.render('addstudents',{err_msg:err.errors[0].message})
    })
})

//-----------------------------ADD SUBJECT-----------------------------
router.get('/addsubject/:id', (req, res)=>{
  dbs.Student.findById(req.params.id)
  .then(rowsStudents=>{
    dbs.Subjects.findAll()
    .then(rowsSubjects=>{
        res.render('addsubject',{dataStudents:rowsStudents,dataSubjects:rowsSubjects,err_msg:false})
    })
  })
})


router.post('/addsubject/:id', (req, res)=>{

    dbs.student_subject.create({
    //   studentId : req.params.id,
    //   SUBJECTID : req.body.subjectId,
      updatedAt : new Date(),
      createdAt : new Date()
  })

  .then(CONJUNCTION => {
    res.redirect('/students')
  })
  .catch(err=>{
    console.log(err);

      // res.render('addsubject',{err_msg:'ADA YANG SALAH'})
    })
})



//---------------------------------------------------------------------
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

module.exports = router
