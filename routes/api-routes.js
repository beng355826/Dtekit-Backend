let router = require('express').Router()
const createUserController = require('../controllers/createUser.controller')
const getAllUsersController = require('../controllers/getAllUsers.controller')
const getUserByIdController = require('../controllers/getUserById.controller')
const updateUserByIdController = require('../controllers/updateUserById.controller')
const deleteUserByIdController = require('../controllers/deleteUserById.controller')

router.get('/', (req,res) => {
    res.json({
        status: 'api working',
        message: "welcome to the Dtekit api router, here we define all functions"
    })
})

router.post('/users', createUserController)
router.get('/users', getAllUsersController)
router.get('/users/:id', getUserByIdController)
router.put('/users/:id',updateUserByIdController)
router.delete('/users/:id', deleteUserByIdController)

module.exports = router