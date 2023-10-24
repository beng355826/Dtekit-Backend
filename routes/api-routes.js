let router = require('express').Router()
const fs = require('fs/promises')
const createUserController = require('../controllers/createUser.controller')
const getAllUsersController = require('../controllers/getAllUsers.controller')
const getUserByIdController = require('../controllers/getUserById.controller')
const updateUserByIdController = require('../controllers/updateUserById.controller')
const deleteUserByIdController = require('../controllers/deleteUserById.controller')

router.get('/', (req,res,next) => {

   fs.readFile(`${__dirname}/endpoints.json`, 'utf-8').then((endPoints , err)=> {
        const parsed = JSON.parse(endPoints)
        console.log(parsed);
        res.status(200).json(parsed)  
    
    }).catch((err) => {
        res.status(500).json({fsReadFile: 'failed', errorMsg: err})
    })

})

router.post('/users', createUserController)
router.get('/users', getAllUsersController)
router.get('/users/:id', getUserByIdController)
router.patch('/users/:id',updateUserByIdController)
router.delete('/users/:id', deleteUserByIdController)

module.exports = router