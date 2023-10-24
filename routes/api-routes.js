let router = require('express').Router()
const fs = require('fs')
const createUserController = require('../controllers/createUser.controller')
const getAllUsersController = require('../controllers/getAllUsers.controller')
const getUserByIdController = require('../controllers/getUserById.controller')
const updateUserByIdController = require('../controllers/updateUserById.controller')
const deleteUserByIdController = require('../controllers/deleteUserById.controller')

router.get('/', async (req,res,next) => {
try{
    const data = fs.readFileSync(`/Users/bennygreen/Documents/Dtekit-Backend/endpoints.json`, 'utf-8')
    const parsed = JSON.parse(data)
   res.json(parsed)
} catch (err) {
    next(err);
}
})

router.post('/users', createUserController)
router.get('/users', getAllUsersController)
router.get('/users/:id', getUserByIdController)
router.patch('/users/:id',updateUserByIdController)
router.delete('/users/:id', deleteUserByIdController)

module.exports = router