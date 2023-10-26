let router = require('express').Router()
const fs = require('fs/promises')

router.get('/', (req,res, next) => {

    fs.readFile(`${__dirname}/endpoints.json`, 'utf-8').then((endPoints , err)=> {
         const parsed = JSON.parse(endPoints)
         res.status(200).json(parsed)  
     
     }).catch((err) => {
         next(err)
     })
 
 })


 module.exports = router