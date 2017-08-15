const express = require('express');
const router = express.Router();
const dbs = require('../models');

router.get('/',(req,res)=>{
  res.render('login', {err:false})
})

router.post('/login', (req,res)=>{
  dbs.User.findAll({where: {username:req.body.username}})
  .then(ogi=>{
    // console.log(ogi[0].password);
    console.log(ogi[0].username);
    // res.send(ogir
      if(ogi[0].password === req.body.password){
        res.redirect('/index')
      }
      else{
        res.render('login',{err: 'Passwordnya salah nak !'})
      }
  })
  .catch(err=>{
    res.render('login', {err:'Username dirimu tak terdaftar nak !'})
  })

})

module.exports = router
