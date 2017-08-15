const express = require('express');
const router = express.Router();
const dbs = require('../models');

router.get('/login',(req,res)=>{
  res.render('login', {err:false})
})

router.post('/', (req,res)=>{
  dbs.User.findAll({where: {username:req.body.username}})
  .then(ogi=>{
    // console.log(ogi);
      if(ogi[0].password === req.body.password){

        req.session['Login']= true;
        req.session['username']= ogi[0].username
        req.session['password']= ogi[0].password
        req.session['role']= ogi[0].role
        res.render('index')
        // res.send(req.session)
        // console.log(req.session.Login);
      }
      else{
        res.render('login',{err: 'Passwordnya salah nak !'})
      }
  })
  .catch(err=>{
    res.render('login', {err:'Username dirimu tak terdaftar nak !'})
  })
})

router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/login')
})

router.use((req,res,next) => {

  if(req.session.Login){
    // console.log(req.session.Login);
    // console.log(req.session.Login);
    next()
  }
  else{
    res.redirect('/login')
  }
})

router.get('/',(req,res)=>{
  res.render('index')
})


module.exports = router
